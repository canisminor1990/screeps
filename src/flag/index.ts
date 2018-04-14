import { Component, EventClass } from '../class';

class FlagClass extends Component {
	list = [];
	stale = [];

	public fresh = () => {
		// occurs when a flag is found (each tick)
		// param: flag
		Flag.found = new EventClass();
		// occurs when a flag memory if found for which no flag exists (before memory removal)
		// param: flagName
		Flag.FlagRemoved = new EventClass();
		//
		let clear = flag => delete flag.targetOf;
		_.forEach(Game.flags, clear);
		this.list = [];
		this.stale = [];
		delete this._hasInvasionFlag;
	};
	public analyze = () => {
		let register = flag => {
			try {
				flag.creeps = {};
				if (flag.cloaking && flag.cloaking > 0) flag.cloaking--;
				this.list.push({
					name: flag.name,
					color: flag.color,
					secondaryColor: flag.secondaryColor,
					roomName: flag.pos.roomName,
					x: flag.pos.x,
					y: flag.pos.y,
					cloaking: flag.cloaking,
				});
			} catch (e) {
				Util.logError(e.stack || e.message);
			}
		};
		_.forEach(Game.flags, register);

		let findStaleFlags = (entry, flagName) => {
			try {
				if (!Game.flags[flagName]) {
					this.stale.push(flagName);
				}
			} catch (e) {
				Util.logError(e.stack || e.message);
			}
		};
		_.forEach(Memory.flags, findStaleFlags);
		const specialFlag = this.specialFlag(true);
		return !!specialFlag;
	};
	public execute = () => {
		let triggerFound = entry => {
			try {
				if (!entry.cloaking || entry.cloaking == 0) {
					const flag = Game.flags[entry.name];
					Flag.found.trigger(flag);
				}
			} catch (e) {
				Util.logError(e.stack || e.message);
			}
		};
		this.list.forEach(triggerFound);

		let triggerRemoved = flagName => Flag.FlagRemoved.trigger(flagName);
		this.stale.forEach(triggerRemoved);
	};
	public cleanup = () => {
		let clearMemory = flagName => delete Memory.flags[flagName];
		this.stale.forEach(clearMemory);
	};

	flagFilter = flagColour => {
		if (!flagColour) return;
		let filter;
		if (flagColour.filter) {
			filter = _.clone(flagColour.filter);
		} else {
			filter = { color: flagColour.color, secondaryColor: flagColour.secondaryColor };
		}
		return filter;
	};
	findName = (flagColor, pos, local = true, mod, modArgs) => {
		let list = this.list;
		if (!flagColor || list.length === 0) return null;
		let filter;
		if (pos instanceof Room) pos = pos.getPositionAt(25, 25);
		if (typeof flagColor === 'function') {
			filter = flagEntry => {
				if (flagColor(flagEntry) && flagEntry.cloaking == 0) {
					if (!local) return true;
					if (pos && pos.roomName && flagEntry.roomName === pos.roomName) return true;
				}
				return false;
			};
		} else {
			filter = this.flagFilter(flagColor);
			_.assign(filter, { cloaking: '0' });
			if (local && pos && pos.roomName) {
				const room = Game.rooms[pos.roomName];
				if (room) {
					list = room.flags;
				} else {
					_.assign(filter, { roomName: pos.roomName });
				}
			}
		}
		let flags = _.filter(list, filter);

		if (flags.length === 0) return null;
		if (flags.length === 1) return flags[0].name;

		// some flags found - find nearest
		if (pos && pos.roomName) {
			let range = flag => {
				let r = 0;
				let roomDist = Util.routeRange(pos.roomName, flag.roomName);
				if (roomDist === 0) {
					r = _.max([Math.abs(flag.x - pos.x), Math.abs(flag.y - pos.y)]);
				} else {
					r = roomDist * 50;
				}
				if (mod) {
					r = mod(r, flag, modArgs);
				}
				flag.valid = r < Infinity;
				return r;
			};
			let flag = _.min(flags, range); // _.sortBy(flags, range)[0];
			return flag.valid ? flag.name : null;
		} else {
			return flags[0].name;
		}
	};
	find = (flagColor, pos, local = true, mod, modArgs) => {
		if (pos instanceof Room) pos = pos.getPositionAt(25, 25);
		let id = this.findName(flagColor, pos, local, mod, modArgs);
		if (id === null) return null;
		return Game.flags[id];
	};
	removeFromDir = name => {
		let index = this.list.indexOf(f => f.name === name);
		if (index > -1) this.list = this.list.splice(index, 1);
	};
	count = (flagColor, pos, local = true) => {
		let list = this.list;
		if (!flagColor || this.list.length === 0) return 0;

		if (pos instanceof Room) pos = pos.getPositionAt(25, 25);
		let filter = this.flagFilter(flagColor);
		if (local && pos && pos.roomName) {
			const room = Game.flags[pos.roomName];
			if (room) {
				list = room.flags;
			} else {
				_.assign(filter, { roomName: pos.roomName });
			}
		}
		return _.countBy(list, filter).true || 0;
	};
	filter = (flagColor, pos, local = true) => {
		if (!flagColor || this.list.length === 0) return [];
		let list = this.list;
		let filter;
		if (pos instanceof Room) pos = pos.getPositionAt(25, 25);
		if (Array.isArray(flagColor)) {
			filter = entry => {
				if (local && pos && pos.roomName && entry.roomName !== pos.roomName) return false;
				for (let i = 0; i < flagColor.length; i++) {
					if (this.compare(flagColor[i], entry)) return true;
				}
				return false;
			};
		} else {
			filter = this.flagFilter(flagColor);
			if (local && pos && pos.roomName) {
				const room = Game.rooms[pos.roomName];
				if (room) {
					list = room.flags;
				} else {
					_.assign(filter, { roomName: pos.roomName });
				}
			}
		}
		return _.filter(list, filter);
	};
	rangeMod = (range, flagItem, args) => {
		let rangeModPerCrowd = args && args.rangeModPerCrowd ? args.rangeModPerCrowd : 20;
		let rangeModByType = args ? args.rangeModByType : null;
		let flag = Game.flags[flagItem.name];
		let crowd;
		if (flag.targetOf) {
			// flag is targetted
			if (rangeModByType) {
				// count defined creep type only
				let count = _.countBy(flag.targetOf, 'creepType')[rangeModByType];
				crowd = count || 0;
			} else crowd = flag.targetOf.length; // count all creeps
		} else crowd = 0; // not targetted
		return range + crowd * rangeModPerCrowd;
	};
	exploitMod = (range, flagItem, creepName) => {
		if (range > 100) return Infinity;
		let flag = Game.flags[flagItem.name];
		if (flag.room) {
			if (flag.room.my) {
				return Infinity;
			}
			let assigned = flag.targetOf
				? _.sum(
						flag.targetOf.map(t => (t.creepType != 'privateer' || t.creepName == creepName ? 0 : t.carryCapacityLeft)),
				  )
				: 0;
			if (flag.room.sourceEnergyAvailable <= assigned) return Infinity;
			return range * range / (flag.room.sourceEnergyAvailable - assigned);
		}
		return range;
	};
	hasInvasionFlag = () => {
		if (_.isUndefined(this._hasInvasionFlag)) {
			this._hasInvasionFlag = this.findName(FLAG_COLOR.invade) != null || this.findName(FLAG_COLOR.destroy) != null;
		}
		return this._hasInvasionFlag;
	};
	compare = (flagA, flagB) => {
		return flagA.color === flagB.color && flagA.secondaryColor === flagB.secondaryColor;
	};
	flagType = flag => {
		if (this.isSpecialFlag(flag)) return '_OCS';
		for (const primary in FLAG_COLOR) {
			const type = FLAG_COLOR[primary];
			if (this.compare(flag, type)) {
				return primary;
			}
			for (const secondary in type) {
				const subType = type[secondary];
				if (this.compare(flag, subType)) return `${primary}.${secondary}`;
			}
		}
		Util.logError(`Unknown flag type for flag: ${flag ? flag.name : 'undefined flag'}.`);
		return 'undefined';
	};
	specialFlag = create => {
		const name = '_OCS';
		const flag = Game.flags[name];
		if (create) {
			if (!flag) {
				return _(Game.rooms)
					.values()
					.some(room => {
						room.getPositionAt(49, 49).newFlag({ color: COLOR_WHITE, secondaryColor: COLOR_PURPLE }, name);
						return true;
					});
			} else if (flag.pos.roomName !== 'W0N0') {
				flag.setPosition(new RoomPosition(49, 49, 'W0N0'));
			}
		}
		return flag;
	};
	isSpecialFlag = object => {
		return object.name === '_OCS';
	};
}

export default new FlagClass();
