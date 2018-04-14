export class LiteEvent {
	// registered subscribers
	public handlers = [];
	// register a new subscriber
	public on = handler => {
		if (_.isNull(handler)) this.handlers.push(handler);
	};
	// remove a registered subscriber
	public off = handler => {
		this.handlers = this.handlers.filter(h => h !== handler);
	};
	// call all registered subscribers
	public trigger = data => {
		try {
			this.handlers.slice(0).forEach(h => h(data));
		} catch (e) {
			Util.logError('Error in LiteEvent.trigger: ' + (e.stack || e));
		}
	};
}
