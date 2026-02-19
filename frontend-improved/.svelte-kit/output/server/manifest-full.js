export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.Bp-9BD8o.js",app:"_app/immutable/entry/app.CZ_bCGra.js",imports:["_app/immutable/entry/start.Bp-9BD8o.js","_app/immutable/chunks/lr9YGdWR.js","_app/immutable/chunks/DqPLj_kq.js","_app/immutable/chunks/DA1g-f31.js","_app/immutable/entry/app.CZ_bCGra.js","_app/immutable/chunks/DqPLj_kq.js","_app/immutable/chunks/DTUQ6j-7.js","_app/immutable/chunks/C-gYAi6i.js","_app/immutable/chunks/DA1g-f31.js","_app/immutable/chunks/BggiOXPC.js","_app/immutable/chunks/CA5h_N2I.js","_app/immutable/chunks/DQFM9RPk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/results",
				pattern: /^\/results\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
