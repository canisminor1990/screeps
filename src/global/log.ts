import { LogLevel } from '../enums/loglevel';

const Color = {
	[COLOR_RED]: '#F92672',
	[COLOR_PURPLE]: '#AE81FF',
	[COLOR_BLUE]: '#66D9EF',
	[COLOR_CYAN]: '#529B2F',
	[COLOR_GREEN]: '#A6E22E',
	[COLOR_YELLOW]: '#E6DB74',
	[COLOR_ORANGE]: '#FD971F',
	[COLOR_BROWN]: '#75715E',
	[COLOR_GREY]: '#888888',
	[COLOR_WHITE]: '#F8F8F0',
};
const Style = {
	...Color,
	black: { color: 'black', fontWeight: 'bold' },
	system: { color: Color[COLOR_GREY], fontSize: '9px' },
	success: { color: Color[COLOR_GREEN], fontSize: '9px' },
	error: { color: Color[COLOR_RED], fontSize: '9px' },
	warn: { color: Color[COLOR_ORANGE], fontSize: '9px' },
	info: { color: Color[COLOR_BLUE], fontSize: '9px' },
	debug: { color: Color[COLOR_BROWN], fontSize: '9px' },
	room: { color: Color[COLOR_PURPLE], fontSize: '9px' },
};

export const Dye = (style: string | number, ...text: any[]): string => {
	const applyStyle = Style[style] as string | Object;
	const msg = text.join(' ');
	if (_.isObject(applyStyle)) {
		let css = '';
		const format = (value: string | number, key: string) => {
			css += `${_.kebabCase(key)}: ${value};`;
		};
		_.forEach(applyStyle, format);
		return `<span style="${css}">${msg}</span>`;
	} else {
		return `<span style="color: ${applyStyle}">${msg}</span>`;
	}
};

class LogClass {
	LogLevel: number;
	Emoji: boolean;

	constructor() {
		this.LogLevel = LogLevel[LOG_LEVEL];
		this.Emoji = LOG_EMOJI;
	}

	success(...content: any[]): void {
		const title = this.Emoji ? String.fromCodePoint(0x2705) : '[SUCCESS]'; // ✅️
		console.log(Dye('success', title), Dye(COLOR_GREEN, ...content));
	}

	error(...content: any[]): void {
		if (this.LogLevel < 2) return;
		const title = this.Emoji ? String.fromCodePoint(0x274c) : '[ERROR]'; // ❌
		console.log(Dye('error', title), Dye(COLOR_RED, ...content));
	}

	warn(...content: any[]) {
		if (this.LogLevel < 3) return;
		const title = this.Emoji ? String.fromCodePoint(0x26a0) : '[WARN]'; // ⚠️
		console.log(Dye('warn', title), Dye(COLOR_ORANGE, ...content));
	}

	info(...content: any[]): void {
		if (this.LogLevel < 4) return;
		const title = this.Emoji ? String.fromCodePoint(0x2139) : '[INFO]'; // ℹ️
		console.log(Dye('info', title), Dye(COLOR_BLUE, ...content));
	}

	debug(...content: any[]): void {
		if (this.LogLevel < 5) return;
		const title = this.Emoji ? String.fromCodePoint(0x1f41b) : '[DEBUG]'; // 🐛
		console.log(Dye('debug', title), ...content);
	}

	module(title: string, ...content: any[]): void {
		console.log(Dye('system', `[${title}]`), ...content);
	}

	room(room: Room, ...content: any[]) {
		console.log(Dye('room', room.print), ...content);
	}

	stringify(content: any): void {
		console.log('----------------------------------------------');
		console.log(JSON.stringify(content, null, 2));
		console.log('----------------------------------------------');
	}
}

export const Log = new LogClass();
