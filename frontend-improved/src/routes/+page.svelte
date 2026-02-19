<script>
  import { goto } from '$app/navigation';
  import { artResults, capturedImageUrl } from '$lib/stores.js';

  let previewUrl = $state(null);
  let loading = $state(false);
  let error = $state(null);
  let isDragging = $state(false);

  let uploadInput;

  // Camera
  let showCamera = $state(false);
  let videoEl = $state(null);
  let stream = $state(null);

  // Bind stream to video element whenever both are available
  $effect(() => {
    if (videoEl && stream) {
      videoEl.srcObject = stream;
    }
  });

  // Stop stream on component destroy
  $effect(() => {
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  });

  async function openCamera() {
    error = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      showCamera = true;
    } catch {
      error = 'Camera access denied. Use "Upload Image" to select a photo.';
    }
  }

  function closeCamera() {
    stream?.getTracks().forEach(t => t.stop());
    stream = null;
    showCamera = false;
  }

  function capturePhoto() {
    if (!videoEl) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    canvas.getContext('2d').drawImage(videoEl, 0, 0);
    previewUrl = canvas.toDataURL('image/jpeg', 0.92);
    closeCamera();
  }

  function triggerUpload() { uploadInput.click(); }

  function handleFileSelect(event) {
    const file = event.target.files?.[0];
    if (file) loadFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) loadFile(file);
  }

  function loadFile(file) {
    error = null;
    const reader = new FileReader();
    reader.onload = (e) => { previewUrl = e.target.result; };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    previewUrl = null;
    error = null;
    uploadInput.value = '';
  }

  async function analyzeImage() {
    if (!previewUrl) return;
    loading = true;
    error = null;

    try {
      const base64 = previewUrl.split(',')[1];
      const response = await fetch('/api/compare-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || `Server error ${response.status}`);
      }

      const data = await response.json();
      const ids = data?.comparable_ids?.[0] ?? [];
      if (!ids.length) throw new Error('No similar artworks found.');

      artResults.set(ids);
      capturedImageUrl.set(previewUrl);
      goto('/results');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<input bind:this={uploadInput} type="file" accept="image/*" onchange={handleFileSelect} class="hidden" />

<!-- Camera overlay -->
{#if showCamera}
  <div class="fixed inset-0 z-50 bg-black flex flex-col" role="dialog" aria-label="Camera">

    <!-- Top bar -->
    <div class="flex items-center justify-between px-6 pt-12 pb-4 shrink-0">
      <span class="text-[10px] uppercase tracking-[0.18em] text-white/40">Camera</span>
      <button
        onclick={closeCamera}
        class="bg-transparent border-none text-white/50 hover:text-white transition-colors text-[11px] uppercase tracking-[0.14em] p-2 touch-manipulation"
      >
        Cancel
      </button>
    </div>

    <!-- Video feed -->
    <div class="flex-1 relative flex items-center justify-center overflow-hidden">
      <video
        bind:this={videoEl}
        autoplay
        playsinline
        muted
        class="w-full h-full object-cover"
      ></video>

      <!-- Viewfinder corner brackets -->
      <div class="absolute inset-8 pointer-events-none">
        <svg class="absolute top-0 left-0 w-10 h-10" viewBox="0 0 40 40" fill="none">
          <path d="M2 18 L2 2 L18 2" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
        <svg class="absolute top-0 right-0 w-10 h-10" viewBox="0 0 40 40" fill="none">
          <path d="M22 2 L38 2 L38 18" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
        <svg class="absolute bottom-0 left-0 w-10 h-10" viewBox="0 0 40 40" fill="none">
          <path d="M2 22 L2 38 L18 38" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
        <svg class="absolute bottom-0 right-0 w-10 h-10" viewBox="0 0 40 40" fill="none">
          <path d="M22 38 L38 38 L38 22" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
      </div>
    </div>

    <!-- Shutter -->
    <div class="flex flex-col items-center gap-3 pb-14 pt-8 shrink-0">
      <button
        onclick={capturePhoto}
        aria-label="Capture photo"
        class="w-[68px] h-[68px] rounded-full border-2 border-white flex items-center justify-center touch-manipulation active:scale-90 transition-transform"
      >
        <span class="w-[52px] h-[52px] rounded-full bg-white block"></span>
      </button>
      <span class="text-[10px] uppercase tracking-[0.16em] text-white/30">Tap to capture</span>
    </div>

  </div>
{/if}

<main class="flex flex-col px-6 pb-10 min-h-dvh">

  <!-- Header -->
  <header class="pt-14 pb-8">
    <div class="flex items-center gap-2 mb-4">
      <span class="block w-1.5 h-1.5 bg-gold rounded-full"></span>
      <span class="text-[10px] uppercase tracking-[0.18em] text-gold">Kunstuitleen Utrecht</span>
    </div>
    <h1 class="text-[32px] font-normal tracking-[0.05em] uppercase text-ink leading-none">Art Finder</h1>
    <div class="mt-5 h-px bg-border"></div>
  </header>

  <!-- Content -->
  <div class="flex-1 flex flex-col gap-5">

    {#if !previewUrl}
      <!-- Drop zone -->
      <div
        class="flex flex-col items-center gap-6 text-center py-14 px-8 border transition-colors {isDragging ? 'border-gold bg-gold/5' : 'border-border bg-white/60'}"
        role="region"
        aria-label="Image drop zone"
        ondragover={(e) => { e.preventDefault(); isDragging = true; }}
        ondragleave={() => isDragging = false}
        ondrop={handleDrop}
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" class="opacity-50">
          <path d="M8 20 L8 8 L20 8" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"/>
          <path d="M52 8 L64 8 L64 20" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"/>
          <path d="M8 52 L8 64 L20 64" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"/>
          <path d="M52 64 L64 64 L64 52" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"/>
          <rect x="24" y="28" width="24" height="17" rx="1.5" stroke="#7A5C14" stroke-width="1.2"/>
          <circle cx="36" cy="36" r="4.5" stroke="#7A5C14" stroke-width="1.2"/>
          <path d="M30 28 L32 24 L40 24 L42 28" stroke="#7A5C14" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
        <p class="text-[14px] leading-relaxed text-muted max-w-[260px] italic">
          Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht
        </p>
      </div>

      {#if error}
        <div class="flex items-center gap-2.5 border border-danger/40 py-3.5 px-4 text-sm text-danger leading-snug">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="1.8"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
          </svg>
          {error}
        </div>
      {/if}

      <!-- Buttons -->
      <div class="flex flex-col gap-3">
        <button
          onclick={openCamera}
          class="flex items-center justify-center gap-3 bg-ink text-surface border-none py-5 px-6 text-[12px] uppercase tracking-[0.14em] w-full touch-manipulation active:opacity-75 transition-opacity"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Take Photo
        </button>

        <button
          onclick={triggerUpload}
          class="flex items-center justify-center gap-3 bg-transparent text-ink border border-ink/30 py-[19px] px-6 text-[12px] uppercase tracking-[0.14em] w-full hover:border-ink/60 transition-colors touch-manipulation"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Upload Image
        </button>
      </div>

    {:else}
      <!-- Preview — gallery mount style -->
      <div class="relative bg-white border border-border">
        <div class="p-5 flex items-center justify-center" style="min-height: 260px; background: #FAFAF8;">
          <img class="block max-w-full max-h-[280px] w-auto h-auto object-contain" src={previewUrl} alt="Selected artwork" />
        </div>
        <button
          onclick={clearImage}
          aria-label="Remove image"
          class="absolute top-2.5 right-2.5 bg-black/60 border-none w-8 h-8 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/80 transition-colors touch-manipulation"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2.5"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2.5"/>
          </svg>
        </button>
      </div>

      {#if error}
        <div class="flex items-center gap-2.5 border border-danger/40 py-3.5 px-4 text-sm text-danger leading-snug">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="1.8"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
          </svg>
          {error}
        </div>
      {/if}

      <!-- Action buttons -->
      <div class="flex flex-col gap-3">
        <button
          onclick={analyzeImage}
          disabled={loading}
          class="flex items-center justify-center gap-3 bg-ink text-surface border-none py-5 px-6 text-[12px] uppercase tracking-[0.14em] w-full transition-opacity active:opacity-75 disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
        >
          {#if loading}
            <span class="w-[14px] h-[14px] border border-surface/30 border-t-surface rounded-full animate-spin shrink-0"></span>
            Analysing…
          {:else}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Find Similar Art
          {/if}
        </button>

        <button
          onclick={clearImage}
          disabled={loading}
          class="bg-transparent border-none text-dim text-[11px] uppercase tracking-[0.1em] underline underline-offset-4 p-2 w-full hover:text-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Choose different image
        </button>
      </div>
    {/if}
  </div>

</main>
