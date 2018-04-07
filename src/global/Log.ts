import { LogLevel } from '../enums/log';
import { Emoji } from '../utils/Emoji';

export class Log {
	LogLevel: number;
	Emoji: boolean;

	constructor() {
		this.LogLevel = LogLevel[LOG_LEVEL];
		this.Emoji = LOG_EMOJI;
	}

	success(...content: any[]): void {
		const title = this.Emoji ? Emoji.tick : '[SUCCESS]';
		console.log(Dye('success', title), Dye(COLOR_GREEN, ...content));
	}

	error(...content: any[]): void {
		if (this.LogLevel < 2) return;
		const title = this.Emoji ? Emoji.cross : '[ERROR]';
		console.log(Dye('error', title), Dye(COLOR_RED, ...content));
	}

	warn(...content: any[]) {
		if (this.LogLevel < 3) return;
		const title = this.Emoji ? Emoji.warn : '[WARN]';
		console.log(Dye('warn', title), Dye(COLOR_ORANGE, ...content));
	}

	info(...content: any[]): void {
		if (this.LogLevel < 4) return;
		const title = this.Emoji ? Emoji.info : '[INFO]';
		console.log(Dye('info', title), Dye(COLOR_BLUE, ...content));
	}

	debug(...content: any[]): void {
		if (this.LogLevel < 5) return;
		const title = this.Emoji ? Emoji.debug : '[DEBUG]';
		console.log(Dye('debug', title), ...content);
	}

	module(title: string, ...content: any[]): void {
		console.log(Dye('system', `[${title}]`), ...content);
	}

	room(room: Room, ...content: any[]) {
		const title = this.Emoji ? `${Emoji.home} ${room.print}` : `[${room.print}]`;
		console.log(Dye('room', title), ...content);
	}

	stringify(content: any): void {
		console.log('----------------------------------------------');
		console.log(JSON.stringify(content, null, 2));
		console.log('----------------------------------------------');
	}
}
