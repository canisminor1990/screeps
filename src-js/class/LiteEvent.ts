export class LiteEvent {
	// registered subscribers
	handlers = [];
	// register a new subscriber
	on = (handler) => {
		this.handlers.push(handler);
	};
	// remove a registered subscriber
	off = (handler) => {
		this.handlers = this.handlers.filter(h => h !== handler);
	};
	// call all registered subscribers
	trigger = (data) => {
		try {
			this.handlers.slice(0).forEach(h => h(data));
		} catch (e) {
			Util.logError('Error in LiteEvent.trigger: ' + (e.stack || e));
		}
	};
}