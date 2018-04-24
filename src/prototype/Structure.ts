class StructureExtend extends Structure {
	constructor() {}

	get active(): boolean {
		if (!this.room.controller) {
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		} else {
			if (!this.room.owner) return false;
			if (this.owner && this.room.owner !== this.owner.username) return false;
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		}
	}

	get towers(): string[] {
		if (_.isUndefined(this._towers) || this._towersSet !== Game.time) {
			this._towersSet = Game.time;
			this._towers = [];
		}
		return this._towers;
	}

	set towers(value: string[]) {
		this._towers = value;
	}
}

Util.define(Structure, StructureExtend);
