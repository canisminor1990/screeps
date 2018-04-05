declare const Dye: Function;
declare const Log: LogProto;

interface LogProto {
	success(...content: any[]): void;

	info(...content: any[]): void;

	error(...content: any[]): void;

	warn(...content: any[]): void;

	debug(...content: any[]): void;

	module(title: string, ...content: any[]): void;

	room(room: Room, ...content: any[]): void;

	stringify(content: any): void;
}
