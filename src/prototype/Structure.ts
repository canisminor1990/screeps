Object.defineProperties(Structure.prototype, {
	towers: {
		get(): string[] {
			if (_.isUndefined(this._towers) || this._towersSet !== Game.time) {
				this._towersSet = Game.time;
				this._towers = [];
			}
			return this._towers;
		},
		set(value: string[]) {
			this._towers = value;
		},
	},
	active: {
		get(): boolean {
			if (!this.room.controller) {
				return _.get(this.room.memory, ['structures', this.id, 'active'], true);
			} else {
				if (!this.room.owner) return false;
				if (this.room.owner !== this.owner.username) return false;
				return _.get(this.room.memory, ['structures', this.id, 'active'], true);
			}
		},
	},
});
