class RoomPositionExtend extends RoomPosition {
	constructor() {}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) {
			this[`_${key}`] = func();
		}
		return this[`_${key}`];
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////

	get adjacent(): RoomPosition[] {
		return this.cache('adjacent', () => {
			let adjacent = [];
			for (let x = this.x - 1; x < this.x + 2; x++) {
				for (let y = this.y - 1; y < this.y + 2; y++) {
					if (x > 0 && x < 49 && y > 0 && y < 49) {
						adjacent.push(new RoomPosition(x, y, this.roomName));
					}
				}
			}
			return adjacent;
		});
	}

	radius(radius: number = 1): RoomPosition[] {
		if (radius === 1) return this.adjacent;
		if (radius < 1) return [this];
		const positions = [];
		for (let x = this.x - radius; x <= this.x + radius; x++) {
			for (let y = this.y - radius; y <= this.y + radius; y++) {
				const pos = new RoomPosition(x, y, this.roomName);
				if (x < 50 && x > 0 && y > 0 && y < 50 && !_.isEqual(this, pos)) {
					positions.push(pos);
				}
			}
		}
		return positions;
	}

	findClosestByPathFinder(goals: RoomObject[], itr: Function = _.identity): RoomObject {
		let mapping = _.map(goals, itr);
		if (_.isEmpty(mapping)) return { goal: null };
		let result = PathFinder.search(this, mapping, {
			maxOps: 16000,
			roomCallback: roomName => {
				let room = Game.rooms[roomName];
				if (!room) return;
				return room.structureMatrix;
			},
		});
		let last = _.last(result.path);
		if (last == undefined) last = this;
		// return {goal: null};
		let goal = _.min(goals, g => last.getRangeTo(g.pos));
		return {
			goal: Math.abs(goal) !== Infinity ? goal : null,
			cost: result.cost,
			ops: result.ops,
			incomplete: result.incomplete,
		};
	}

	findClosestSpawn(): StructureSpawn {
		return this.findClosestByPathFinder(Game.spawns, spawn => ({ pos: spawn.pos, range: 1 })).goal;
	}

	/**
	 * Create a new flag at this position
	 * @param {Object|string} flagColour - An object with color and secondaryColor properties, or a string path for a FLAG_COLOR
	 * @param {string} [name] - Optional name for the flag
	 * @returns {string|Number} The name of the flag or an error code.
	 */
	newFlag(flagColour: obj, name: string): string | number | void {
		if (!flagColour) flagColour = _.get(FLAG_COLOR, flagColour); // allows you to pass through a string (e.g. 'invade.robbing')
		if (!flagColour) return;
		return this.createFlag(name, flagColour.color, flagColour.secondaryColor);
	}
}

Util.define(RoomPosition, RoomPositionExtend);
