interface Event {
	handlers: any[];
	on(handler: any): void;
	off(handler: any): void;
	trigger(data: any): void;
}
