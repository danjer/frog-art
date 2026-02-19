import { a as attr_class } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isDragging = false;
    $$renderer2.push(`<input type="file" accept="image/*" capture="environment" style="display:none"/> <input type="file" accept="image/*" style="display:none"/> <main class="svelte-1uha8ag"><header class="svelte-1uha8ag"><div class="logo svelte-1uha8ag"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#c3a920" stroke-width="1.5"></circle><circle cx="14" cy="14" r="6" fill="#c3a920" opacity="0.3"></circle><circle cx="14" cy="14" r="2.5" fill="#c3a920"></circle></svg></div> <div class="header-text svelte-1uha8ag"><h1 class="svelte-1uha8ag">Art Finder</h1> <p class="svelte-1uha8ag">Kunstuitleen Utrecht</p></div></header> <div class="content svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class("drop-zone svelte-1uha8ag", void 0, { "dragging": isDragging })} role="region" aria-label="Image drop zone"><div class="drop-icon svelte-1uha8ag"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="14" width="48" height="36" rx="4" stroke="#c3a920" stroke-width="1.5" stroke-dasharray="4 3"></rect><circle cx="22" cy="27" r="5" stroke="#c3a920" stroke-width="1.5"></circle><path d="M8 38 L20 28 L30 36 L40 26 L56 40" stroke="#c3a920" stroke-width="1.5" stroke-linejoin="round"></path></svg></div> <p class="drop-hint svelte-1uha8ag">Point your camera at any artwork to discover similar pieces available at Kunstuitleen Utrecht</p></div> <div class="actions svelte-1uha8ag"><button class="btn-primary svelte-1uha8ag"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.8"></circle></svg> Take Photo</button> <button class="btn-secondary svelte-1uha8ag"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></polyline><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="1.8"></line></svg> Upload Image</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <footer class="svelte-1uha8ag"><p>Powered by <a href="https://kunstuitleenutrecht.nl" target="_blank" rel="noopener" class="svelte-1uha8ag">Kunstuitleen Utrecht</a></p></footer></main>`);
  });
}
export {
  _page as default
};
