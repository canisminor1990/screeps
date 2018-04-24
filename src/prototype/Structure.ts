class StructureExtend extends Structure {
	constructor() {}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function, checkTime: boolean): any {
		if (checkTime) {
			if (_.isUndefined(this[`_${key}`]) || this[`_${key}Set`] !== Game.time) {
				this[`_${key}Set`] = Game.time;
				this[`_${key}`] = func();
			}
		} else {
			if (_.isUndefined(this[`_${key}`])) {
				this[`_${key}`] = func();
			}
		}

		return this[`_${key}`];
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////

	get active(): boolean {
		if (!this.room.controller) {
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		} else {
			if (!this.room.owner) return false;
			if (this.room.owner !== this.owner.username) return false;
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		}
	}

	get towers(): string[] {
		this.cache('towers', () => [], true);
	}

	set towers(value: string[]) {
		this._towers = value;
	}
}

Util.define(Structure, StructureExtend);
