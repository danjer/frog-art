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
		client: {start:"_app/immutable/entry/start.BfvkFXko.js",app:"_app/immutable/entry/app.BRyi69oW.js",imports:["_app/immutable/entry/start.BfvkFXko.js","_app/immutable/chunks/CZWD1F-R.js","_app/immutable/chunks/DVMqm5Pa.js","_app/immutable/entry/app.BRyi69oW.js","_app/immutable/chunks/DVMqm5Pa.js","_app/immutable/chunks/C4QFSHVy.js","_app/immutable/chunks/BhiB9kwF.js","_app/immutable/chunks/BF2FFNwg.js","_app/immutable/chunks/Cl35E2AD.js","_app/immutable/chunks/DMYtRbyc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
