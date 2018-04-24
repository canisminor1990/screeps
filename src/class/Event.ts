export class EventConstructor {
	// registered subscribers
	public handlers: Function[] = [];
	// register a new subscriber
	public on = (handler: Function): void => {
		if (handler !== null) this.handlers.push(handler);
	};
	// remove a registered subscriber
	public off = (handler: Function): void => {
		this.handlers = this.handlers.filter((h: Function) => h !== handler);
	};
	// call all registered subscribers
	public trigger = (data: any): void => {
		try {
			this.handlers.slice(0).forEach((h: Function) => h(data));
		} catch (e) {
			Log.error('Error in LiteEvent.trigger: ' + (e.stack || e));
		}
	};
}
