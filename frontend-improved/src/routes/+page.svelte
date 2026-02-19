<script>
  import { goto } from '$app/navigation';
  import { artResults, capturedImageUrl } from '$lib/stores.js';

  let previewUrl = $state(null);
  let loading = $state(false);
  let error = $state(null);
  let isDragging = $state(false);

  let cameraInput;
  let uploadInput;

  function triggerCamera() {
    cameraInput.click();
  }

  function triggerUpload() {
    uploadInput.click();
  }

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
    reader.onload = (e) => {
      previewUrl = e.target.result;
    };
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
      // Strip data URI prefix — send raw base64
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
      // API returns comparable_ids[0][0] as the array of IDs
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

<!-- Hidden file inputs -->
<input
  bind:this={cameraInput}
  type="file"
  accept="image/*"
  capture="environment"
  onchange={handleFileSelect}
  style="display:none"
/>
<input
  bind:this={uploadInput}
  type="file"
  accept="image/*"
  onchange={handleFileSelect}
  style="display:none"
/>

<main>
  <!-- Header -->
  <header>
    <div class="logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#c3a920" stroke-width="1.5"/>
        <circle cx="14" cy="14" r="6" fill="#c3a920" opacity="0.3"/>
        <circle cx="14" cy="14" r="2.5" fill="#c3a920"/>
      </svg>
    </div>
    <div class="header-text">
      <h1>Art Finder</h1>
      <p>Kunstuitleen Utrecht</p>
    </div>
  </header>

  <!-- Content -->
  <div class="content">
    {#if !previewUrl}
      <!-- Landing state -->
      <div
        class="drop-zone"
        class:dragging={isDragging}
        role="region"
        aria-label="Image drop zone"
        ondragover={(e) => { e.preventDefault(); isDragging = true; }}
        ondragleave={() => isDragging = false}
        ondrop={handleDrop}
      >
        <div class="drop-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="14" width="48" height="36" rx="4" stroke="#c3a920" stroke-width="1.5" stroke-dasharray="4 3"/>
            <circle cx="22" cy="27" r="5" stroke="#c3a920" stroke-width="1.5"/>
            <path d="M8 38 L20 28 L30 36 L40 26 L56 40" stroke="#c3a920" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="drop-hint">Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht</p>
      </div>

      <div class="actions">
        <button class="btn-primary" onclick={triggerCamera}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Take Photo
        </button>
        <button class="btn-secondary" onclick={triggerUpload}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          Upload Image
        </button>
      </div>

    {:else}
      <!-- Preview state -->
      <div class="preview-wrap">
        <img class="preview" src={previewUrl} alt="Selected artwork" />
        <button class="clear-btn" onclick={clearImage} aria-label="Remove image">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      {#if error}
        <div class="error-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#e05252" stroke-width="1.8"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="#e05252" stroke-width="1.8"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="#e05252" stroke-width="2"/>
          </svg>
          {error}
        </div>
      {/if}

      <div class="actions">
        <button
          class="btn-primary"
          onclick={analyzeImage}
          disabled={loading}
        >
          {#if loading}
            <span class="spinner"></span>
            Analysing…
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Find Similar Art
          {/if}
        </button>
        <button class="btn-ghost" onclick={clearImage} disabled={loading}>
          Choose different image
        </button>
      </div>
    {/if}
  </div>

  <!-- Footer -->
  <footer>
    <p>Powered by <a href="https://kunstuitleenutrecht.nl" target="_blank" rel="noopener">Kunstuitleen Utrecht</a></p>
  </footer>
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 20px 24px;
    min-height: 100dvh;
  }

  /* Header */
  header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 48px 0 32px;
  }

  .logo {
    flex-shrink: 0;
  }

  .header-text h1 {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: #f0ede6;
  }

  .header-text p {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #c3a920;
    margin-top: 2px;
  }

  /* Content */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Drop zone */
  .drop-zone {
    border: 1.5px dashed #333;
    border-radius: 16px;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    transition: border-color 0.2s, background 0.2s;
    background: rgba(255,255,255,0.02);
  }

  .drop-zone.dragging {
    border-color: #c3a920;
    background: rgba(195, 169, 32, 0.05);
  }

  .drop-icon {
    opacity: 0.7;
  }

  .drop-hint {
    font-size: 15px;
    line-height: 1.6;
    color: #888;
    max-width: 280px;
  }

  /* Buttons */
  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #c3a920;
    color: #111;
    border: none;
    border-radius: 14px;
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.02em;
    width: 100%;
    transition: opacity 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-primary:active:not(:disabled) {
    transform: scale(0.98);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    color: #f0ede6;
    border: 1.5px solid #333;
    border-radius: 14px;
    padding: 17px 24px;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    transition: border-color 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-secondary:hover {
    border-color: #555;
  }

  .btn-secondary:active {
    transform: scale(0.98);
  }

  .btn-ghost {
    background: none;
    border: none;
    color: #666;
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 8px;
    width: 100%;
    transition: color 0.15s;
  }

  .btn-ghost:hover {
    color: #999;
  }

  .btn-ghost:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Preview */
  .preview-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: #1a1a1a;
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .clear-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0,0,0,0.7);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    backdrop-filter: blur(4px);
    -webkit-tap-highlight-color: transparent;
    transition: background 0.15s;
  }

  .clear-btn:hover {
    background: rgba(0,0,0,0.9);
  }

  /* Error */
  .error-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(224, 82, 82, 0.1);
    border: 1px solid rgba(224, 82, 82, 0.3);
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 14px;
    color: #e05252;
    line-height: 1.4;
  }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(17,17,17,0.3);
    border-top-color: #111;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Footer */
  footer {
    padding-top: 32px;
    text-align: center;
    font-size: 12px;
    color: #444;
  }

  footer a {
    color: #666;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
