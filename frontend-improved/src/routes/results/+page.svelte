<script>
  import { goto } from '$app/navigation';
  import { artResults, capturedImageUrl } from '$lib/stores.js';

  let ids = $derived($artResults ?? []);
  let sourceImage = $derived($capturedImageUrl);
  let activeIndex = $state(0);

  const IMAGE_BASE = 'https://digicat.kunstuitleenutrecht.nl/digicat/plaatjes/jpg';
  const PURCHASE_BASE = 'https://kunstuitleenutrecht.kunstuitleenonline.nl/item/UTR';

  function imageUrl(id) { return `${IMAGE_BASE}/${id}.jpg`; }
  function purchaseUrl(id) { return `${PURCHASE_BASE}${id}`; }
  function goBack() { goto('/'); }

  let touchStartX = 0;
  function onTouchStart(e) { touchStartX = e.touches[0].clientX; }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && activeIndex < ids.length - 1) activeIndex++;
      else if (dx > 0 && activeIndex > 0) activeIndex--;
    }
  }
</script>

<main class="flex flex-col px-5 pb-8 min-h-dvh">

  <!-- Header -->
  <header class="flex items-center gap-3.5 pt-12 pb-7">
    <button
      onclick={goBack}
      aria-label="Go back"
      class="bg-white/[0.06] border border-border rounded-full w-10 h-10 flex items-center justify-center text-ink shrink-0 transition-colors hover:bg-white/10 touch-manipulation"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div>
      <h1 class="text-xl font-normal tracking-[0.03em]">Similar Artworks</h1>
      <p class="text-xs text-gold uppercase tracking-[0.08em] mt-[3px]">
        {ids.length} {ids.length === 1 ? 'result' : 'results'} found
      </p>
    </div>
  </header>

  {#if ids.length === 0}
    <div class="flex-1 flex items-center justify-center text-base text-muted">
      <p>No results. <button onclick={goBack} class="bg-transparent border-none text-gold underline underline-offset-[3px] text-base cursor-pointer">Try again</button></p>
    </div>
  {:else}

    <!-- Carousel -->
    <div
      class="overflow-hidden rounded-[20px] shrink-0"
      role="region"
      aria-label="Artwork results"
      ontouchstart={onTouchStart}
      ontouchend={onTouchEnd}
    >
      <div
        class="flex will-change-transform"
        style="transform: translateX({-activeIndex * 100}%); transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);"
      >
        {#each ids as id, i}
          <article class="min-w-full bg-card rounded-[20px] overflow-hidden flex flex-col" aria-hidden={i !== activeIndex}>

            <!-- Artwork image -->
            <div class="h-[300px] bg-[#1e1e1e] flex items-center justify-center">
              <img
                src={imageUrl(id)}
                alt="Artwork {id}"
                class="max-w-full max-h-full w-auto h-auto object-contain block"
                loading={i === 0 ? 'eager' : 'lazy'}
                referrerpolicy="no-referrer"
                onerror={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
              />
              <div class="flex-col items-center justify-center gap-3 text-dim text-sm w-full h-full" style="display:none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="opacity-30">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>Image unavailable</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5 flex flex-col gap-3.5">
              <div class="flex items-center justify-between">
                <span class="bg-gold/15 text-gold text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border border-gold/30">
                  #{i + 1} Match
                </span>
                <span class="text-xs text-dim font-mono">ID: {id}</span>
              </div>

              <p class="flex items-center gap-1.5 text-[13px] text-muted">
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
                class="flex items-center justify-center gap-2.5 bg-gold text-surface rounded-xl py-4 px-5 text-[15px] font-semibold tracking-[0.02em] hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] touch-manipulation"
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

    <!-- Dot navigation -->
    <div class="flex justify-center gap-2 py-4 pb-1" role="tablist" aria-label="Artwork navigation">
      {#each ids as _, i}
        <button
          class="rounded-full border-none p-0 cursor-pointer transition-[background,transform] touch-manipulation {i === activeIndex ? 'w-4 h-1.5 bg-gold rounded-full' : 'w-1.5 h-1.5 bg-border-2'}"
          onclick={() => activeIndex = i}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label="Artwork {i + 1}"
        ></button>
      {/each}
    </div>

    {#if ids.length > 1}
      <p class="text-center text-xs text-[#444] tracking-[0.05em] pb-2">Swipe to see more results</p>
    {/if}

    <!-- Your photo -->
    {#if sourceImage}
      <div class="mt-2 flex flex-col gap-3">
        <h2 class="text-sm font-normal uppercase tracking-[0.08em] text-dim">Your photo</h2>
        <img src={sourceImage} alt="Your uploaded artwork" class="w-full rounded-xl object-cover max-h-[180px] brightness-[0.85]" />
      </div>
    {/if}

    <!-- Footer action -->
    <div class="mt-4">
      <button
        onclick={goBack}
        class="flex items-center justify-center gap-2.5 bg-transparent text-ink border border-border rounded-[14px] py-[17px] px-6 text-[15px] w-full hover:border-[#444] active:scale-[0.98] transition-[border-color,transform] touch-manipulation"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
        </svg>
        Scan another artwork
      </button>
    </div>

  {/if}
</main>
