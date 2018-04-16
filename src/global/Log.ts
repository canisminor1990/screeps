import { LogLevel } from '../enum/log';
import { ErrorType } from '../enum/error';
import { Emoji } from '../util';
import { ConvertJsonToTable } from '../lib/json-to-table';
class Log {
	LogLevel: number;
	Emoji: boolean;

	constructor() {
		this.LogLevel = LogLevel[LOG_LEVEL];
		this.Emoji = LOG_EMOJI;
	}

	success(...content: any[]): void {
		const title = this.Emoji ? Emoji.tick : '[SUCCESS]';
		console.log(Dye('success', title) + ' ' + Dye(COLOR_GREEN, ...content));
	}

	error(...content: any[]): void {
		if (this.LogLevel < 2) return;
		const title = this.Emoji ? Emoji.cross : '[ERROR]';
		console.log(Dye('error', title) + ' ' + Dye(COLOR_RED, ...content));
	}

	errorCode(creep: Creep, code: number): void {
		if (code) {
			const error = ErrorType[code];
			if (creep) {
				if (error) creep.say(error);
				else creep.say(code);
			}
			let message =
				error +
				'\nroom: ' +
				creep.pos.roomName +
				'\ncreep: ' +
				creep.name +
				'\naction: ' +
				creep.data.actionName +
				'\ntarget: ' +
				creep.data.targetId;
			this.error(message);
			Game.notify(message, 120);
		} else {
			let message =
				'unknown error code\nroom: ' +
				creep.pos.roomName +
				'\ncreep: ' +
				creep.name +
				'\naction: ' +
				creep.data.actionName +
				'\ntarget: ' +
				creep.data.targetId;
			this.error(message, this.stack());
		}
	}

	warn(...content: any[]) {
		if (this.LogLevel < 3) return;
		const title = this.Emoji ? Emoji.warn : '[WARN]';
		console.log(Dye('warn', title) + ' ' + Dye(COLOR_ORANGE, ...content));
	}

	info(...content: any[]): void {
		if (this.LogLevel < 4) return;
		const title = this.Emoji ? Emoji.info : '[INFO]';
		console.log(Dye('info', title) + ' ' + Dye(COLOR_BLUE, ...content));
	}

	debug(...content: any[]): void {
		if (this.LogLevel < 5) return;
		const title = this.Emoji ? Emoji.debug : '[DEBUG]';
		console.log(Dye('debug', title), ...content);
	}

	module(title: string, ...content: any[]): void {
		console.log(Dye('system', `[${title}]`), ...content);
	}

	room(room: Room | string, ...content: any[]) {
		if (_.isString(room)) {
			room = Util.makeRoomUrl(room);
		} else {
			room = room.print;
		}
		const title = this.Emoji ? `${Emoji.home} ${room}` : `[${room}]`;
		console.log(Dye('room', title), ...content);
	}

	flag(flag: Flag | string, ...content: any[]) {
		if (_.isString(flag)) {
			flag = Util.makeFlagUrl(flag);
		} else {
			flag = flag.print;
		}
		const title = this.Emoji ? `${Emoji.flag} ${flag}` : `[${flag}]`;
		console.log(Dye('room', title), ...content);
	}

	stringify(content: any): void {
		console.log(JSON.stringify(content, null, 2));
	}

	table(obj: obj): void {
		console.log(Util.jsonToTable(obj));
	}

	stack(force: boolean = false, placeholder: string = ' ') {
		if (DEBUG_STACKS || force) {
			return new Error(`\nSTACK; param:${DEBUG_STACKS}, force:${force}`).stack;
		}
		return placeholder;
	}

	trace(category: string, entityWhere: any, ...message: any[]): void {
		let msg = message;
		let key;
		if (message.length === 0 && category) {
			let leaf = category;
			do {
				key = leaf;
				leaf = entityWhere[leaf];
			} while (entityWhere[leaf] && leaf !== category);

			if (leaf && leaf !== category) {
				if (typeof leaf === 'string') {
					msg = [leaf];
				} else {
					msg = [key, '=', leaf];
				}
			}
		}
		console.log(Dye(COLOR_ORANGE, `[${category}`), ...msg, '<br/>', Util.jsonToTable(entityWhere), this.stack());
	}
}

export default new Log();
