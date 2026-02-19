import { g as getContext, e as escape_html } from "../../chunks/index2.js";
import "clsx";
import "../../chunks/state.svelte.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { w as writable } from "../../chunks/index.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="flex-1 flex items-center justify-center min-h-dvh p-5"><div class="text-center flex flex-col gap-4 items-center"><h1 class="text-[72px] text-gold font-light leading-none">${escape_html(page.status)}</h1> <p class="text-muted text-base">${escape_html(page.error?.message ?? "Something went wrong")}</p> <a href="/" class="bg-gold text-surface rounded-xl py-3.5 px-7 text-[15px] font-semibold inline-block mt-2">Go home</a></div></div>`);
  });
}
export {
  _error as default
};
