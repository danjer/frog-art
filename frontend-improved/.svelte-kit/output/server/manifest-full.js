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
		client: {start:"_app/immutable/entry/start.CM0YvdEq.js",app:"_app/immutable/entry/app.CZH7Flf5.js",imports:["_app/immutable/entry/start.CM0YvdEq.js","_app/immutable/chunks/BS3U1QtH.js","_app/immutable/chunks/BIEZKKlQ.js","_app/immutable/chunks/C-eJva-1.js","_app/immutable/entry/app.CZH7Flf5.js","_app/immutable/chunks/BIEZKKlQ.js","_app/immutable/chunks/DIis8234.js","_app/immutable/chunks/vihjIoPZ.js","_app/immutable/chunks/C-eJva-1.js","_app/immutable/chunks/D-Zqrf7R.js","_app/immutable/chunks/D6WuKkBY.js","_app/immutable/chunks/Sf7xacb7.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
