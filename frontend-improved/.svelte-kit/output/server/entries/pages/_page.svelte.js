import { a as attr_class, b as stringify } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<input type="file" accept="image/*" capture="environment" class="hidden"/> <input type="file" accept="image/*" class="hidden"/> <main class="flex flex-col px-5 pb-6 min-h-dvh"><header class="flex items-center gap-3 pt-12 pb-8"><div class="shrink-0"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#c3a920" stroke-width="1.5"></circle><circle cx="14" cy="14" r="6" fill="#c3a920" opacity="0.3"></circle><circle cx="14" cy="14" r="2.5" fill="#c3a920"></circle></svg></div> <div><h1 class="text-[22px] font-normal tracking-[0.04em] text-ink">Art Finder</h1> <p class="text-[11px] uppercase tracking-[0.12em] text-gold mt-0.5">Kunstuitleen Utrecht</p></div></header> <div class="flex-1 flex flex-col gap-5">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`border border-dashed rounded-2xl py-12 px-6 flex flex-col items-center gap-5 text-center transition-colors ${stringify("border-border-2 bg-white/[0.02]")}`)} role="region" aria-label="Image drop zone"><div class="opacity-70"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="14" width="48" height="36" rx="4" stroke="#c3a920" stroke-width="1.5" stroke-dasharray="4 3"></rect><circle cx="22" cy="27" r="5" stroke="#c3a920" stroke-width="1.5"></circle><path d="M8 38 L20 28 L30 36 L40 26 L56 40" stroke="#c3a920" stroke-width="1.5" stroke-linejoin="round"></path></svg></div> <p class="text-[15px] leading-relaxed text-muted max-w-[280px]">Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht</p></div> <div class="flex flex-col gap-3"><button class="flex items-center justify-center gap-2.5 bg-gold text-surface border-none rounded-[14px] py-[18px] px-6 text-base font-semibold tracking-[0.02em] w-full touch-manipulation active:scale-[0.98] transition-[opacity,transform]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"></circle></svg> Take Photo</button> <button class="flex items-center justify-center gap-2.5 bg-transparent text-ink border border-border-2 rounded-[14px] py-[17px] px-6 text-base w-full hover:border-[#555] active:scale-[0.98] transition-[border-color,transform] touch-manipulation"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></polyline><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"></line></svg> Upload Image</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <footer class="pt-8 text-center text-xs text-[#444]"><p>Powered by <a href="https://kunstuitleenutrecht.nl" target="_blank" rel="noopener" class="text-[#666] underline underline-offset-[2px]">Kunstuitleen Utrecht</a></p></footer></main>`);
  });
}
export {
  _page as default
};
