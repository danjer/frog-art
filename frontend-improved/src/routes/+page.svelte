<script>
  import { goto } from '$app/navigation';
  import { artResults, capturedImageUrl } from '$lib/stores.js';

  let previewUrl = $state(null);
  let loading = $state(false);
  let error = $state(null);
  let isDragging = $state(false);

  let cameraInput;
  let uploadInput;

  function triggerCamera() { cameraInput.click(); }
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
    cameraInput.value = '';
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
      // API returns comparable_ids[0] as the array of IDs
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

<input bind:this={cameraInput} type="file" accept="image/*" capture="environment" onchange={handleFileSelect} class="hidden" />
<input bind:this={uploadInput} type="file" accept="image/*" onchange={handleFileSelect} class="hidden" />

<main class="flex flex-col px-5 pb-6 min-h-dvh">

  <!-- Header -->
  <header class="flex items-center gap-3 pt-12 pb-8">
    <div class="shrink-0">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#c3a920" stroke-width="1.5"/>
        <circle cx="14" cy="14" r="6" fill="#c3a920" opacity="0.3"/>
        <circle cx="14" cy="14" r="2.5" fill="#c3a920"/>
      </svg>
    </div>
    <div>
      <h1 class="text-[22px] font-normal tracking-[0.04em] text-ink">Art Finder</h1>
      <p class="text-[11px] uppercase tracking-[0.12em] text-gold mt-0.5">Kunstuitleen Utrecht</p>
    </div>
  </header>

  <!-- Content -->
  <div class="flex-1 flex flex-col gap-5">

    {#if !previewUrl}
      <!-- Drop zone -->
      <div
        class="border border-dashed rounded-2xl py-12 px-6 flex flex-col items-center gap-5 text-center transition-colors {isDragging ? 'border-gold bg-gold/5' : 'border-border-2 bg-white/[0.02]'}"
        role="region"
        aria-label="Image drop zone"
        ondragover={(e) => { e.preventDefault(); isDragging = true; }}
        ondragleave={() => isDragging = false}
        ondrop={handleDrop}
      >
        <div class="opacity-70">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="14" width="48" height="36" rx="4" stroke="#c3a920" stroke-width="1.5" stroke-dasharray="4 3"/>
            <circle cx="22" cy="27" r="5" stroke="#c3a920" stroke-width="1.5"/>
            <path d="M8 38 L20 28 L30 36 L40 26 L56 40" stroke="#c3a920" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="text-[15px] leading-relaxed text-muted max-w-[280px]">
          Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col gap-3">
        <button
          onclick={triggerCamera}
          class="flex items-center justify-center gap-2.5 bg-gold text-surface border-none rounded-[14px] py-[18px] px-6 text-base font-semibold tracking-[0.02em] w-full touch-manipulation active:scale-[0.98] transition-[opacity,transform]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Take Photo
        </button>

        <button
          onclick={triggerUpload}
          class="flex items-center justify-center gap-2.5 bg-transparent text-ink border border-border-2 rounded-[14px] py-[17px] px-6 text-base w-full hover:border-[#555] active:scale-[0.98] transition-[border-color,transform] touch-manipulation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Upload Image
        </button>
      </div>

    {:else}
      <!-- Preview -->
      <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-card">
        <img class="w-full h-full object-cover block" src={previewUrl} alt="Selected artwork" />
        <button
          onclick={clearImage}
          aria-label="Remove image"
          class="absolute top-3 right-3 bg-black/70 border-none rounded-full w-9 h-9 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/90 transition-colors touch-manipulation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      {#if error}
        <div class="flex items-center gap-2.5 bg-danger/10 border border-danger/30 rounded-[10px] py-3.5 px-4 text-sm text-danger leading-snug">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0">
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
          class="flex items-center justify-center gap-2.5 bg-gold text-surface border-none rounded-[14px] py-[18px] px-6 text-base font-semibold tracking-[0.02em] w-full transition-[opacity,transform] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
        >
          {#if loading}
            <span class="w-[18px] h-[18px] border-2 border-surface/30 border-t-surface rounded-full animate-spin shrink-0"></span>
            Analysing…
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Find Similar Art
          {/if}
        </button>

        <button
          onclick={clearImage}
          disabled={loading}
          class="bg-transparent border-none text-dim text-sm underline underline-offset-[3px] p-2 w-full hover:text-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Choose different image
        </button>
      </div>
    {/if}
  </div>

  <!-- Footer -->
  <footer class="pt-8 text-center text-xs text-[#444]">
    <p>Powered by <a href="https://kunstuitleenutrecht.nl" target="_blank" rel="noopener" class="text-[#666] underline underline-offset-[2px]">Kunstuitleen Utrecht</a></p>
  </footer>

</main>
