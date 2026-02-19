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

<main class="flex flex-col px-6 pb-10 min-h-dvh">

  <!-- Header -->
  <header class="pt-14 pb-8">
    <div class="flex items-center gap-4">
      <button
        onclick={goBack}
        aria-label="Go back"
        class="border border-ink/20 w-9 h-9 flex items-center justify-center text-ink shrink-0 transition-colors hover:border-ink/60 touch-manipulation"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div>
        <h1 class="text-[13px] uppercase tracking-[0.14em] text-ink font-normal">Similar Works</h1>
        <p class="text-[10px] uppercase tracking-[0.1em] text-gold mt-1">
          {ids.length} {ids.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
    </div>
    <div class="mt-5 h-px bg-border"></div>
  </header>

  {#if ids.length === 0}
    <div class="flex-1 flex items-center justify-center">
      <p class="text-sm text-muted italic">No results. <button onclick={goBack} class="bg-transparent border-none text-gold underline underline-offset-[3px] text-sm cursor-pointer not-italic">Try again</button></p>
    </div>
  {:else}

    <!-- Carousel -->
    <div
      class="overflow-hidden shrink-0"
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
          <article class="min-w-full bg-white border border-border flex flex-col" aria-hidden={i !== activeIndex}>

            <!-- Artwork — gallery mount treatment -->
            <div class="flex items-center justify-center py-8 px-6" style="min-height: 280px; background: #FAFAF8;">
              <img
                src={imageUrl(id)}
                alt="Artwork {id}"
                class="max-w-full max-h-[240px] w-auto h-auto object-contain block"
                loading={i === 0 ? 'eager' : 'lazy'}
                referrerpolicy="no-referrer"
                onerror={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
              />
              <div class="flex-col items-center justify-center gap-3 text-dim text-sm w-full h-full" style="display:none">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="opacity-30">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span class="text-[12px] uppercase tracking-[0.08em]">Image unavailable</span>
              </div>
            </div>

            <!-- Thin rule -->
            <div class="h-px bg-border mx-6"></div>

            <!-- Info -->
            <div class="px-6 py-5 flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="text-[10px] uppercase tracking-[0.16em] text-gold border border-gold/40 px-2.5 py-1">
                  {String(i + 1).padStart(2, '0')} / {String(ids.length).padStart(2, '0')}
                </span>
                <span class="text-[10px] text-dim tracking-[0.06em] font-mono">#{id}</span>
              </div>

              <p class="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-muted">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Kunstuitleen Utrecht
              </p>

              <a
                href={purchaseUrl(id)}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2.5 bg-ink text-surface py-4 px-5 text-[12px] uppercase tracking-[0.14em] hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation"
              >
                View Work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <!-- Dot navigation -->
    {#if ids.length > 1}
      <div class="flex justify-center items-center gap-2 py-5" role="tablist" aria-label="Artwork navigation">
        {#each ids as _, i}
          <button
            class="border-none p-0 cursor-pointer transition-all touch-manipulation {i === activeIndex ? 'w-5 h-[3px] bg-ink' : 'w-[3px] h-[3px] bg-border-2'}"
            onclick={() => activeIndex = i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label="Artwork {i + 1}"
          ></button>
        {/each}
      </div>

      <p class="text-center text-[10px] uppercase tracking-[0.1em] text-dim pb-3">Swipe to browse</p>
    {:else}
      <div class="py-4"></div>
    {/if}

    <!-- Your photo -->
    {#if sourceImage}
      <div class="flex flex-col gap-3">
        <p class="text-[10px] uppercase tracking-[0.14em] text-dim">Your Photograph</p>
        <div class="bg-white border border-border p-3">
          <img src={sourceImage} alt="Your uploaded artwork" class="w-full object-contain max-h-[160px] block" style="background: #FAFAF8;" />
        </div>
      </div>
    {/if}

    <!-- Footer action -->
    <div class="mt-5">
      <button
        onclick={goBack}
        class="flex items-center justify-center gap-2.5 bg-transparent text-ink border border-ink/25 py-[17px] px-6 text-[12px] uppercase tracking-[0.14em] w-full hover:border-ink/60 transition-colors touch-manipulation"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
        </svg>
        Scan Another Artwork
      </button>
    </div>

  {/if}
</main>
