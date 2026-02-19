

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CxM3xodd.js","_app/immutable/chunks/C-gYAi6i.js","_app/immutable/chunks/DqPLj_kq.js","_app/immutable/chunks/g9Z4m9rP.js"];
export const stylesheets = ["_app/immutable/assets/0.CY9u0Y9e.css"];
export const fonts = [];
