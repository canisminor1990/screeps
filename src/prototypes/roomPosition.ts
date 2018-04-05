import { getGame } from '../utils';

Object.defineProperties(RoomPosition.prototype, {
	room: {
		get(): Room {
			return Game.rooms[this.roomName];
		},
	},
	memory: {
		get(): any {
			this.room.memory;
		},
		set(value): void {
			this.room.memory = value;
		},
	},
	cacheLookFoor: {
		value(type: LookConstant): any[] {
			const pos = `${this.x},${this.y}`;
			const cacheResult = _.get(this.memory, ['_lookFor', pos, type]) as LookForCache;
			if (!_.isUndefined(cacheResult) && cacheResult.time === Game.time) {
				switch (type) {
					case LOOK_TERRAIN:
						return cacheResult.value;
					case LOOK_FLAGS:
						return getGame.flagsByNameArray(cacheResult.value);
					default:
						return getGame.objsByIdArray(cacheResult.value);
				}
			}
			const result = this.lookFor(type);
			switch (type) {
				case LOOK_TERRAIN:
					_.set(this.memory, ['_lookFor', pos, type], {
						time: Game.time,
						value: result,
					});
				case LOOK_FLAGS:
					_.set(this.memory, ['_lookFor', pos, type], {
						time: Game.time,
						value: getGame.flagsToNameArray(result),
					});
				default:
					_.set(this.memory, ['_lookFor', pos, type], {
						time: Game.time,
						value: getGame.objsToIdArray(result),
					});
			}
			return result;
		},
	},
});
