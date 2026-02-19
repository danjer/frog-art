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
		client: {start:"_app/immutable/entry/start.Djy4PCf5.js",app:"_app/immutable/entry/app.BJ6htHzJ.js",imports:["_app/immutable/entry/start.Djy4PCf5.js","_app/immutable/chunks/R393HSqu.js","_app/immutable/chunks/DqPLj_kq.js","_app/immutable/chunks/DA1g-f31.js","_app/immutable/entry/app.BJ6htHzJ.js","_app/immutable/chunks/DqPLj_kq.js","_app/immutable/chunks/DTUQ6j-7.js","_app/immutable/chunks/C-gYAi6i.js","_app/immutable/chunks/DA1g-f31.js","_app/immutable/chunks/BggiOXPC.js","_app/immutable/chunks/CA5h_N2I.js","_app/immutable/chunks/DQFM9RPk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/results"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
