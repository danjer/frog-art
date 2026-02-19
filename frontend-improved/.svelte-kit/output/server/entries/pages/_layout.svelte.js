import { h as head, s as slot } from "../../chunks/index2.js";
function _layout($$renderer, $$props) {
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Art Finder — Kunstuitleen Utrecht</title>`);
    });
  });
  $$renderer.push(`<div class="w-full max-w-[480px] mx-auto min-h-dvh flex flex-col"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div>`);
}
export {
  _layout as default
};
