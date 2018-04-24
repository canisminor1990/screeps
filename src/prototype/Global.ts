class globalExtend {
	constructor() {}

	/**
	 * Pass an object containing room information to the requests
	 * @param {Object} request - `roomName` property required
	 */
	get observerRequests(): any[] {
		return Util.get(global, '_observerRequests', []);
	}

	set observerRequests(request: any[]) {
		Util.get(global, '_observerRequests', []).push(request);
	}

	get cacheValid(): object {
		return Memory.cacheValid;
	}
}

Util.define(global, globalExtend, true);
