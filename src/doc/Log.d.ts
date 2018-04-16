declare const Log: LogConstructor;

interface LogConstructor {
	success(...content: any[]): void;

	info(...content: any[]): void;

	error(...content: any[]): void;

	errorCode(creep: Creep, code: number): void;

	warn(...content: any[]): void;

	debug(...content: any[]): void;

	module(title: string, ...content: any[]): void;

	room(room: Room, ...content: any[]): void;

	stringify(content: any): void;

	table(obj: obj): void;

	stack(force: boolean = false, placeholder: string = ' ');

	trace(category: string, entityWhere: any, ...message: any[]): void;
}
