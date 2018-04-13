import {dateUtils} from './date';
import {logUtils} from './log';
import {roomUtils} from './room';
import {marketUtils} from './market';

const utils = {
	/**
	 * 格式化数字单位
	 */
	formatNumber(number: number): string {
		let ld = Math.log10(number) / 3;
		if (!number) return '0';
		let n = number.toString();
		if (ld < 1) return n;
		if (ld < 2) return n.substring(0, n.length - 3) + 'k';
		if (ld < 3) return n.substring(0, n.length - 6) + 'M';
		if (ld < 4) return n.substring(0, n.length - 9) + 'B';
		return number.toString();
	},
	/**
	 * 给角色标序号
	 */
	pad(number: number, padCharacter: string = '0', padLength: number = 2, padLengthMax: boolean = true): string {
		if (padLengthMax) padLength -= number.toString().length;
		const padString = _.times(padLength, () => padCharacter).join('');
		return padString + number;
	},

	/**
	 * 从一个对象获取 property，可选: 设置默认值
	 */
	get(object: object, path: string, defaultValue: any, setDefault: boolean = true): any {
		const r = _.get(object, path);
		if (_.isUndefined(r) && !_.isUndefined(defaultValue) && setDefault) {
			defaultValue = Util.fieldOrFunction(defaultValue);
			_.set(object, path, defaultValue);
			return _.get(object, path);
		}
		return r;
	},

	/**
	 * 检查所有传递的参数是否相等
	 */
	areEqual(...args: any[]): boolean {
		if (args.length <= 1) return true;
		// @ts-ignore
		return args.every((v, i, a) => _.isEqual(v, a[0]));
	},

	/**
	 * 为一个对象设置 property, 可选: 就算不存在也依然设置
	 */
	set(object: object, path: string, value: any, onlyIfNotExists: boolean = true): void {
		if (onlyIfNotExists) {
			Util.get(object, path, value);
			return;
		}
		_.set(object, path, value);
	},

	/**
	 * 如果存在则呼叫一个方法
	 */
	callIfExists(toCall: Function, ...args: any[]): any {
		if (toCall) return toCall(...args);
	},

	/**
	 * 如果是方法则返回方法结果，否则返回其本身
	 */
	fieldOrFunction(value: any, ...args: any[]): any {
		return _.isFunction(value) ? value(...args) : value;
	},

	/**
	 * Adds a Game object to an array by providing the object ID
	 */
	addById(array: any[], id: string): any[] {
		if (!array) array = [];
		const obj = Game.getObjectById(id);
		if (obj) array.push(obj);
		return array;
	},

	/**
	 * 通过邮件发送房间信息
	 */
	processReports(): void {
		if (
				!_.isUndefined(Memory.statistics) &&
				!_.isUndefined(Memory.statistics.reports) &&
				Memory.statistics.reports.length
		) {
			let mails;
			if (Memory.statistics.reports.length <= REPORTS_PER_LOOP) {
				mails = Memory.statistics.reports;
				Memory.statistics.reports = [];
			} else {
				mails = Memory.statistics.reports.splice(0, REPORTS_PER_LOOP);
			}
			_.forEach(mails, Game.notify);
		}
	},
	/**
	 * Generate a GUID. Note: This is not guaranteed to be 100% unique.
	 */
	guid(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},
	/**
	 * Checks if a specific creep type is in queue, either globally or for a room
	 * @param {Object|String} opts - Behaviour if string, else an object with either behaviour, setup, or name. Optionally a room name.
	 * @returns {boolean} - True if the creep is in queue somewhere, otherwise false.
	 */
	inQueue(opts: obj): boolean {
		if (!opts) return false;
		// string check
		if (opts.link) opts = {behaviour: opts};
		if (!opts.name && !opts.behaviour && !opts.setup) return false;
		// @ts-ignore
		return _(Game.rooms)
				.filter('my')
				.map('memory')
				.map((m: obj) => m.spawnQueueHigh.concat(m.spawnQueueMedium, m.spawnQueueLow))
				.flatten()
				.some((q: obj) => {
					if (opts.room) if (q.destiny && q.destiny.room !== opts.room) return false;
					if (opts.behaviour) return (q.behaviour && q.behaviour === opts.behaviour) || q.name.includes(opts.behaviour);
					if (opts.setup) return q.setup === opts.setup;
				});
	},

	/**
	 * List the current memory usage of a given path in memory in kb
	 * @param {string} key - The location in memory to check eg 'rooms.E1S1.statistics'
	 */
	memoryUsage(mem: string): string {
		let string = '';
		let total = 0;
		let biggestKey = '';
		// @ts-ignore
		for (const key in mem) {
			if (key.length > biggestKey.length) biggestKey = key;
			const sum = JSON.stringify(mem[key]).length / 1024;
			total += sum;
			string += `<tr><td>${key}</td><td>${_.round(sum, 2)}</td></tr>`;
		}
		string += `<tr><td>Total</td><td>${_.round(total, 2)}</td></tr></table>`;
		const padding = Array(biggestKey.length + 2).join(' ');
		return `<table><tr><th>Key${padding}</th><th>Size (kb)</th></tr>`.concat(string);
	},

	_resources: _.memoize(() => {
		// @ts-ignore
		return _.chain(global)
				.pick((v, k) => k.startsWith('RESOURCE_'))
				.value();
	}),

	/**
	 * cached map of all the game's resources
	 */
	resources() {
		return this._resources();
	},

	valueOrZero(x: any) {
		return x || 0;
	},

	chargeScale(amount: number, min: number, max: number): number {
		// TODO per-room strategy
		if (max === min) {
			if (amount > max) {
				return Infinity;
			} else {
				return -Infinity;
			}
		}
		const chargeScale = 1 / (max - min); // TODO cache

		return (amount - max) * chargeScale + 1;
	},

	resetBoostProduction(roomName: string): void {
		let data;
		let myRooms = _.filter(Game.rooms, {my: true});

		for (let room of myRooms) {
			if (roomName === undefined || room.name === roomName) {
				data = room.memory.resources;

				console.log(room.name);

				if (!_.isUndefined(data)) {
					data.offers = [];
					data.orders = [];

					if (data.terminal[0]) data.terminal[0].orders = [];

					if (data.storage[0]) data.storage[0].orders = [];

					if (data.reactions) data.reactions.orders = [];

					if (data.lab) {
						data.lab = [];
						_.values(Game.structures)
								.filter((i: Structure) => i.structureType === 'lab')
								.map((i: StructureLab) => i.room.setStore(i.id, RESOURCE_ENERGY, 2000));
					}
					delete data.boostTiming;
				} else console.log(`${room.name} has no memory.resources`);
			}
		}
		if (roomName === undefined) delete Memory.boostTiming;
	},
};

export default _.assign(utils, roomUtils, logUtils, dateUtils, marketUtils);

export function Install(name, main, extend = false) {
	if (_.isString(name)) {
		global[name] = main
		if (extend) _.assign(global[name], extend)
	} else {
		_.assign(name, main)
		if (extend) _.assign(name, extend)
	}
}

export const getUsername = _(Game.rooms).map('controller').filter('my').map('owner.username').first()
