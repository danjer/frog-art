import { e as escape_html, b as attr_style, c as ensure_array_like, d as attr, a as attr_class, f as derived, i as store_get, j as stringify, u as unsubscribe_stores } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { w as writable } from "../../../chunks/index.js";
const artResults = writable(null);
const capturedImageUrl = writable(null);
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let ids = derived(() => store_get($$store_subs ??= {}, "$artResults", artResults) ?? []);
    let sourceImage = derived(() => store_get($$store_subs ??= {}, "$capturedImageUrl", capturedImageUrl));
    let activeIndex = 0;
    const IMAGE_BASE = "https://digicat.kunstuitleenutrecht.nl/digicat/plaatjes/jpg";
    const PURCHASE_BASE = "https://kunstuitleenutrecht.kunstuitleenonline.nl/item/UTR";
    function imageUrl(id) {
      return `${IMAGE_BASE}/${id}.jpg`;
    }
    function purchaseUrl(id) {
      return `${PURCHASE_BASE}${id}`;
    }
    $$renderer2.push(`<main class="svelte-bxfdlt"><header class="svelte-bxfdlt"><button class="back-btn svelte-bxfdlt" aria-label="Go back"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <div class="header-text svelte-bxfdlt"><h1 class="svelte-bxfdlt">Similar Artworks</h1> <p class="svelte-bxfdlt">${escape_html(ids().length)} ${escape_html(ids().length === 1 ? "result" : "results")} found</p></div></header> `);
    if (ids().length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty svelte-bxfdlt"><p>No results. <button class="link svelte-bxfdlt">Try again</button></p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="carousel svelte-bxfdlt" role="region" aria-label="Artwork results"><div class="slides svelte-bxfdlt"${attr_style(`transform: translateX(${stringify(-activeIndex * 100)}%)`)}><!--[-->`);
      const each_array = ensure_array_like(ids());
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let id = each_array[i];
        $$renderer2.push(`<article class="slide svelte-bxfdlt"${attr("aria-hidden", i !== activeIndex)}><div class="art-image-wrap svelte-bxfdlt"><img${attr("src", imageUrl(id))}${attr("alt", `Artwork ${stringify(id)}`)} class="art-image svelte-bxfdlt"${attr("loading", i === 0 ? "eager" : "lazy")} referrerpolicy="no-referrer" onerror="this.__e=event"/> <div class="art-image-fallback svelte-bxfdlt" style="display:none"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"></rect><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg> <span>Image unavailable</span></div></div> <div class="art-info svelte-bxfdlt"><div class="art-meta svelte-bxfdlt"><span class="art-badge svelte-bxfdlt">#${escape_html(i + 1)} Match</span> <span class="art-id svelte-bxfdlt">ID: ${escape_html(id)}</span></div> <p class="art-location svelte-bxfdlt"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5"></path><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"></circle></svg> Kunstuitleen Utrecht</p> <a${attr("href", purchaseUrl(id))} target="_blank" rel="noopener noreferrer" class="btn-kunstuitleen svelte-bxfdlt"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></line></svg> View at Kunstuitleen</a></div></article>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="dots svelte-bxfdlt" role="tablist" aria-label="Artwork navigation"><!--[-->`);
      const each_array_1 = ensure_array_like(ids());
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        each_array_1[i];
        $$renderer2.push(`<button${attr_class("dot svelte-bxfdlt", void 0, { "active": i === activeIndex })} role="tab"${attr("aria-selected", i === activeIndex)}${attr("aria-label", `Artwork ${stringify(i + 1)}`)}></button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (ids().length > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="swipe-hint svelte-bxfdlt">Swipe to see more results</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (sourceImage()) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="your-photo-section svelte-bxfdlt"><h2 class="svelte-bxfdlt">Your photo</h2> <img${attr("src", sourceImage())} alt="Your uploaded artwork" class="your-photo svelte-bxfdlt"/></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="footer-actions svelte-bxfdlt"><button class="btn-secondary svelte-bxfdlt"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"></circle></svg> Scan another artwork</button></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
