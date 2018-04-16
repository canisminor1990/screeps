export class EventClass {
	// registered subscribers
	public handlers = [];
	// register a new subscriber
	public on = handler => {
		this.handlers.push(handler);
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
			Log.error('Error in LiteEvent.trigger: ' + (e.stack || e));
		}
	};
}
