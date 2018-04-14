Object.defineProperties(global, {
	observerRequests: {
		get(): obj {
			return Util.get(global, '_observerRequests', []);
		},
		/**
		 * Pass an object containing room information to the requests
		 * @param {Object} request - `roomName` property required
		 */
		set(request: obj) {
			Util.get(global, '_observerRequests', []).push(request);
		},
	},
	cacheValid: {
		get() {
			return Memory.cacheValid;
		},
	},
	profiler: {
		get() {
			return Memory.profiler;
		},
	},
});
