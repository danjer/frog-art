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
    $$renderer2.push(`<input type="file" accept="image/*" class="hidden"/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex flex-col px-6 pb-10 min-h-dvh"><header class="pt-14 pb-8"><div class="flex items-center gap-2 mb-4"><span class="block w-1.5 h-1.5 bg-gold rounded-full"></span> <span class="text-[10px] uppercase tracking-[0.18em] text-gold">Kunstuitleen Utrecht</span></div> <h1 class="text-[32px] font-normal tracking-[0.05em] uppercase text-ink leading-none">Art Finder</h1> <div class="mt-5 h-px bg-border"></div></header> <div class="flex-1 flex flex-col gap-5">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`flex flex-col items-center gap-6 text-center py-14 px-8 border transition-colors ${stringify("border-border bg-white/60")}`)} role="region" aria-label="Image drop zone"><svg width="72" height="72" viewBox="0 0 72 72" fill="none" class="opacity-50"><path d="M8 20 L8 8 L20 8" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"></path><path d="M52 8 L64 8 L64 20" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"></path><path d="M8 52 L8 64 L20 64" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"></path><path d="M52 64 L64 64 L64 52" stroke="#7A5C14" stroke-width="1.5" fill="none" stroke-linecap="square"></path><rect x="24" y="28" width="24" height="17" rx="1.5" stroke="#7A5C14" stroke-width="1.2"></rect><circle cx="36" cy="36" r="4.5" stroke="#7A5C14" stroke-width="1.2"></circle><path d="M30 28 L32 24 L40 24 L42 28" stroke="#7A5C14" stroke-width="1.2" stroke-linejoin="round"></path></svg> <p class="text-[14px] leading-relaxed text-muted max-w-[260px] italic">Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht</p></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex flex-col gap-3"><button class="flex items-center justify-center gap-3 bg-ink text-surface border-none py-5 px-6 text-[12px] uppercase tracking-[0.14em] w-full touch-manipulation active:opacity-75 transition-opacity"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"></circle></svg> Take Photo</button> <button class="flex items-center justify-center gap-3 bg-transparent text-ink border border-ink/30 py-[19px] px-6 text-[12px] uppercase tracking-[0.14em] w-full hover:border-ink/60 transition-colors touch-manipulation"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></polyline><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"></line></svg> Upload Image</button></div>`);
    }
    $$renderer2.push(`<!--]--></div></main>`);
  });
}
export {
  _page as default
};
