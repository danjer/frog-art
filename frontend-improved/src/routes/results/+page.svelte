<script>
  import { goto } from '$app/navigation';
  import { artResults, capturedImageUrl } from '$lib/stores.js';

  let ids = $derived($artResults ?? []);
  let sourceImage = $derived($capturedImageUrl);
  let activeIndex = $state(0);

  const IMAGE_BASE = 'https://digicat.kunstuitleenutrecht.nl/digicat/plaatjes/jpg';
  const PURCHASE_BASE = 'https://kunstuitleenutrecht.kunstuitleenonline.nl/item/UTR';

  function imageUrl(id) {
    return `${IMAGE_BASE}/${id}.jpg`;
  }

  function purchaseUrl(id) {
    return `${PURCHASE_BASE}${id}`;
  }

  function goBack() {
    goto('/');
  }

  let touchStartX = 0;

  function onTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && activeIndex < ids.length - 1) activeIndex++;
      else if (dx > 0 && activeIndex > 0) activeIndex--;
    }
  }
</script>

<main>
  <header>
    <button class="back-btn" onclick={goBack} aria-label="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="header-text">
      <h1>Similar Artworks</h1>
      <p>{ids.length} {ids.length === 1 ? 'result' : 'results'} found</p>
    </div>
  </header>

  {#if ids.length === 0}
    <div class="empty">
      <p>No results. <button class="link" onclick={goBack}>Try again</button></p>
    </div>
  {:else}
    <!-- Carousel -->
    <div
      class="carousel"
      role="region"
      aria-label="Artwork results"
      ontouchstart={onTouchStart}
      ontouchend={onTouchEnd}
    >
      <div class="slides" style="transform: translateX({-activeIndex * 100}%)">
        {#each ids as id, i}
          <article class="slide" aria-hidden={i !== activeIndex}>
            <div class="art-image-wrap">
              <img
                src={imageUrl(id)}
                alt="Artwork {id}"
                class="art-image"
                loading={i === 0 ? 'eager' : 'lazy'}
                referrerpolicy="no-referrer"
                onerror={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
              />
              <div class="art-image-fallback" style="display:none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>Image unavailable</span>
              </div>
            </div>

            <div class="art-info">
              <div class="art-meta">
                <span class="art-badge">#{i + 1} Match</span>
                <span class="art-id">ID: {id}</span>
              </div>
              <p class="art-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Kunstuitleen Utrecht
              </p>

              <a
                href={purchaseUrl(id)}
                target="_blank"
                rel="noopener noreferrer"
                class="btn-kunstuitleen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                View at Kunstuitleen
              </a>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <!-- Dots -->
    <div class="dots" role="tablist" aria-label="Artwork navigation">
      {#each ids as _, i}
        <button
          class="dot"
          class:active={i === activeIndex}
          onclick={() => activeIndex = i}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label="Artwork {i + 1}"
        ></button>
      {/each}
    </div>

    <!-- Swipe hint -->
    {#if ids.length > 1}
      <p class="swipe-hint">Swipe to see more results</p>
    {/if}

    <!-- Your photo -->
    {#if sourceImage}
      <div class="your-photo-section">
        <h2>Your photo</h2>
        <img src={sourceImage} alt="Your uploaded artwork" class="your-photo" />
      </div>
    {/if}

    <div class="footer-actions">
      <button class="btn-secondary" onclick={goBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
        </svg>
        Scan another artwork
      </button>
    </div>
  {/if}
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 20px 32px;
    min-height: 100dvh;
  }

  /* Header */
  header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 48px 0 28px;
  }

  .back-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid #2a2a2a;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f0ede6;
    flex-shrink: 0;
    transition: background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.1);
  }

  .header-text h1 {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.03em;
  }

  .header-text p {
    font-size: 12px;
    color: #c3a920;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 3px;
  }

  /* Carousel */
  .carousel {
    overflow: hidden;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .slides {
    display: flex;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .slide {
    min-width: 100%;
    background: #1a1a1a;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Art image */
  .art-image-wrap {
    position: relative;
    height: 300px;
    background: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .art-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .art-image-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #555;
    font-size: 13px;
    width: 100%;
    height: 100%;
  }

  /* Art info */
  .art-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .art-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .art-badge {
    background: rgba(195, 169, 32, 0.15);
    color: #c3a920;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(195, 169, 32, 0.3);
  }

  .art-id {
    font-size: 12px;
    color: #555;
    font-family: 'Courier New', monospace;
  }

  .art-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #888;
  }

  /* Kunstuitleen button */
  .btn-kunstuitleen {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #c3a920;
    color: #111;
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    transition: opacity 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-kunstuitleen:hover {
    opacity: 0.9;
  }

  .btn-kunstuitleen:active {
    transform: scale(0.97);
  }

  /* Dots */
  .dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 16px 0 4px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #333;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
  }

  .dot.active {
    background: #c3a920;
    transform: scale(1.4);
  }

  /* Swipe hint */
  .swipe-hint {
    text-align: center;
    font-size: 12px;
    color: #444;
    letter-spacing: 0.05em;
    padding-bottom: 8px;
  }

  /* Your photo */
  .your-photo-section {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .your-photo-section h2 {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #555;
  }

  .your-photo {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    max-height: 180px;
    filter: brightness(0.85);
  }

  /* Footer actions */
  .footer-actions {
    margin-top: 16px;
  }

  .btn-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    color: #f0ede6;
    border: 1.5px solid #2a2a2a;
    border-radius: 14px;
    padding: 17px 24px;
    font-size: 15px;
    font-weight: 400;
    width: 100%;
    transition: border-color 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-secondary:hover {
    border-color: #444;
  }

  .btn-secondary:active {
    transform: scale(0.98);
  }

  /* Empty state */
  .empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
  }

  .link {
    background: none;
    border: none;
    color: #c3a920;
    font-size: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
</style>
