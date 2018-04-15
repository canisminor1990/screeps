export const logUtils = {
	/**
	 * 翻译错误信息
	 */
	translateErrorCode(code: number): string {
		return {
			0: 'OK',
			1: 'ERR_NOT_OWNER',
			2: 'ERR_NO_PATH',
			3: 'ERR_NAME_EXISTS',
			4: 'ERR_BUSY',
			5: 'ERR_NOT_FOUND',
			6: 'ERR_NOT_ENOUGH_RESOURCES',
			7: 'ERR_INVALID_TARGET',
			8: 'ERR_FULL',
			9: 'ERR_NOT_IN_RANGE',
			10: 'ERR_INVALID_ARGS',
			11: 'ERR_TIRED',
			12: 'ERR_NO_BODYPART',
			14: 'ERR_RCL_NOT_ENOUGH',
			15: 'ERR_GCL_NOT_ENOUGH',
		}[code * -1];
	},

	/**
	 * 返回一个css style 格式
	 */
	dye(style: obj | string, ...text: string[]): string {
		const msg = text.join(' ');
		if (_.isObject(style)) {
			let css = '';
			const format = (key: string) => (css += `${_.kebabCase(key)}: ${style[key]};`);
			_.forEach(Object.keys(style), format);
			return `<span style="${css}">${msg}</span>`;
		}
		if (style) {
			return `<span style="color: ${style}">${msg}</span>`;
		}
		return msg;
	},

	// TODO: Log

	/**
	 * Logs an error to console
	 */
	logError(message: string, entityWhere: any): void {
		const msg = Util.dye(CRAYON.error, message);
		if (entityWhere) {
			Util.trace('error', entityWhere, msg);
		} else {
			console.log(msg, Util.stack());
		}
	},

	/**
	 * Log an error for a creep's action, given an error code
	 */
	logErrorCode(creep: Creep, code: number): void {
		if (code) {
			let error = Util.translateErrorCode(code);
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
			console.log(Util.dye(CRAYON.error, message), Util.stack());
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
			console.log(Util.dye(CRAYON.error, message), Util.stack());
		}
	},

	/**
	 * Log text as a system message showing a "referrer" as a label
	 */
	logSystem(roomName: string, ...message: string[]): void {
		const text = Util.dye(CRAYON.system, roomName);
		console.log(
			Util.dye(
				CRAYON.system,
				`<a href="/a/#!/room/${Game.shard.name}/${roomName}">${text}</a> &gt;`,
			),
			...message,
			Util.stack(),
		);
	},

	logStringify(x) {
		console.log(JSON.stringify(x, null, 2));
	},

	/**
	 * Build a stacktrace if DEBUG_STACKS or the first argument is true.
	 */
	stack(force: boolean = false, placeholder: string = ' ') {
		if (DEBUG_STACKS || force) {
			return new Error(`\nSTACK; param:${DEBUG_STACKS}, force:${force}`).stack;
		}
		return placeholder;
	},

	/**
	 * Trace an error or debug statement
	 */
	trace(category: string, entityWhere: any, ...message: any[]): void {
		// function reduceMemoryWhere(result: boolean, value: any, key: string): boolean {
		// 	const setting = Memory.debugTrace[key];
		// 	if (!Reflect.has(Memory.debugTrace, key)) {
		// 		return result;
		// 	} else if (result) {
		// 		return setting === value || (!value && setting === `${value}`);
		// 	}
		// 	return false;
		// }
		//
		// function noMemoryWhere(e: obj) {
		// 	const setting = Memory.debugTrace.no[e[0]];
		// 	return (
		// 		setting === true || (e[0] in Memory.debugTrace.no && (setting === e[1] || (!e[1] && setting === `${e[1]}`)))
		// 	);
		// }
		//
		// if (!(Memory.debugTrace[category] === true || _(entityWhere).reduce(reduceMemoryWhere, 1) === true)) return;
		// if (
		// 	Memory.debugTrace.no &&
		// 	_(entityWhere)
		// 		.pairs()
		// 		.some(noMemoryWhere) === true
		// )
		// 	return;
		//
		// let msg = message;
		// let key;
		// if (message.length === 0 && category) {
		// 	let leaf = category;
		// 	do {
		// 		key = leaf;
		// 		leaf = entityWhere[leaf];
		// 	} while (entityWhere[leaf] && leaf !== category);
		//
		// 	if (leaf && leaf !== category) {
		// 		if (typeof leaf === 'string') {
		// 			msg = [leaf];
		// 		} else {
		// 			msg = [key, '=', leaf];
		// 		}
		// 	}
		// }

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
		console.log(
			Game.time,
			Util.dye(CRAYON.error, category),
			...msg,
			'<br/>',
			Util.dye(CRAYON.birth, JSON.stringify(entityWhere, null, 2)),
			Util.stack(),
		);
	},
};
