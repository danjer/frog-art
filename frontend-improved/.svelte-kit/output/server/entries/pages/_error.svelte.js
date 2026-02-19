import { g as getContext, e as escape_html } from "../../chunks/root.js";
import "clsx";
import "../../chunks/client.js";
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
    $$renderer2.push(`<main class="svelte-1j96wlh"><div class="error-page svelte-1j96wlh"><h1 class="svelte-1j96wlh">${escape_html(page.status)}</h1> <p class="svelte-1j96wlh">${escape_html(page.error?.message ?? "Something went wrong")}</p> <a href="/" class="btn svelte-1j96wlh">Go home</a></div></main>`);
  });
}
export {
  _error as default
};
