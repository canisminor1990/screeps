class RoomObjectExtend extends RoomObject {
	constructor() {}

	get accessibleFields(): number {
		if (this.memory && !_.isUndefined(this.memory.accessibleFields)) {
			return this.memory.accessibleFields;
		} else {
			let fields = this.room.lookForAtArea(
				LOOK_TERRAIN,
				this.pos.y - 1,
				this.pos.x - 1,
				this.pos.y + 1,
				this.pos.x + 1,
				true,
			);
			let walls = _.countBy(fields, 'terrain').wall;
			let accessibleFields = walls === undefined ? 9 : 9 - walls;
			return this.memory ? (this.memory.accessibleFields = accessibleFields) : accessibleFields;
		}
	}

	get cloak(): number | boolean {
		const value = Memory.cloaked[this.id];
		if (!value) {
			return false;
		} else if (_.isNumber(value) && Game.time > value) {
			delete Memory.cloaked[this.id];
			return false;
		} else {
			return value;
		}
	}

	set cloak(value: number | boolean) {
		if (!value) {
			delete Memory.cloaked[this.id];
			return undefined;
		} else if (_.isNumber(value)) {
			if (value < Game.time) {
				value = Game.time + value;
			}
		} else {
			value = true;
		}
		return (Memory.cloaked[this.id] = value);
	}
}

Util.define(RoomObject, RoomObjectExtend);
