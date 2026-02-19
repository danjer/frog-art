import { e as escape_html, c as attr_style, d as ensure_array_like, f as attr, a as attr_class, i as derived, j as store_get, b as stringify, u as unsubscribe_stores } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { w as writable } from "../../../chunks/index.js";
const artResults = writable([]);
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
    $$renderer2.push(`<main class="flex flex-col px-5 pb-8 min-h-dvh"><header class="flex items-center gap-3.5 pt-12 pb-7"><button aria-label="Go back" class="bg-white/[0.06] border border-border rounded-full w-10 h-10 flex items-center justify-center text-ink shrink-0 transition-colors hover:bg-white/10 touch-manipulation"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <div><h1 class="text-xl font-normal tracking-[0.03em]">Similar Artworks</h1> <p class="text-xs text-gold uppercase tracking-[0.08em] mt-[3px]">${escape_html(ids().length)} ${escape_html(ids().length === 1 ? "result" : "results")} found</p></div></header> `);
    if (ids().length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex-1 flex items-center justify-center text-base text-muted"><p>No results. <button class="bg-transparent border-none text-gold underline underline-offset-[3px] text-base cursor-pointer">Try again</button></p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="overflow-hidden rounded-[20px] shrink-0" role="region" aria-label="Artwork results"><div class="flex will-change-transform"${attr_style(`transform: translateX(${stringify(-activeIndex * 100)}%); transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);`)}><!--[-->`);
      const each_array = ensure_array_like(ids());
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let id = each_array[i];
        $$renderer2.push(`<article class="min-w-full bg-card rounded-[20px] overflow-hidden flex flex-col"${attr("aria-hidden", i !== activeIndex)}><div class="h-[300px] bg-[#1e1e1e] flex items-center justify-center"><img${attr("src", imageUrl(id))}${attr("alt", `Artwork ${stringify(id)}`)} class="max-w-full max-h-full w-auto h-auto object-contain block"${attr("loading", i === 0 ? "eager" : "lazy")} referrerpolicy="no-referrer" onerror="this.__e=event"/> <div class="flex-col items-center justify-center gap-3 text-dim text-sm w-full h-full" style="display:none"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="opacity-30"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"></rect><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg> <span>Image unavailable</span></div></div> <div class="p-5 flex flex-col gap-3.5"><div class="flex items-center justify-between"><span class="bg-gold/15 text-gold text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border border-gold/30">#${escape_html(i + 1)} Match</span> <span class="text-xs text-dim font-mono">ID: ${escape_html(id)}</span></div> <p class="flex items-center gap-1.5 text-[13px] text-muted"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5"></path><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"></circle></svg> Kunstuitleen Utrecht</p> <a${attr("href", purchaseUrl(id))} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2.5 bg-gold text-surface rounded-xl py-4 px-5 text-[15px] font-semibold tracking-[0.02em] hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] touch-manipulation"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></line></svg> View at Kunstuitleen</a></div></article>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex justify-center gap-2 py-4 pb-1" role="tablist" aria-label="Artwork navigation"><!--[-->`);
      const each_array_1 = ensure_array_like(ids());
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        each_array_1[i];
        $$renderer2.push(`<button${attr_class(`rounded-full border-none p-0 cursor-pointer transition-[background,transform] touch-manipulation ${stringify(i === activeIndex ? "w-4 h-1.5 bg-gold rounded-full" : "w-1.5 h-1.5 bg-border-2")}`)} role="tab"${attr("aria-selected", i === activeIndex)}${attr("aria-label", `Artwork ${stringify(i + 1)}`)}></button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (ids().length > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-center text-xs text-[#444] tracking-[0.05em] pb-2">Swipe to see more results</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (sourceImage()) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-2 flex flex-col gap-3"><h2 class="text-sm font-normal uppercase tracking-[0.08em] text-dim">Your photo</h2> <img${attr("src", sourceImage())} alt="Your uploaded artwork" class="w-full rounded-xl object-cover max-h-[180px] brightness-[0.85]"/></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mt-4"><button class="flex items-center justify-center gap-2.5 bg-transparent text-ink border border-border rounded-[14px] py-[17px] px-6 text-[15px] w-full hover:border-[#444] active:scale-[0.98] transition-[border-color,transform] touch-manipulation"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"></circle></svg> Scan another artwork</button></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
