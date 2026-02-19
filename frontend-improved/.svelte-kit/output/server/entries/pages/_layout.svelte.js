import { h as head, s as slot } from "../../chunks/root.js";
import "../../chunks/client.js";
function _layout($$renderer, $$props) {
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Art Finder — Kunstuitleen Utrecht</title>`);
    });
  });
  $$renderer.push(`<div class="app svelte-12qhfyh"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div>`);
}
export {
  _layout as default
};
