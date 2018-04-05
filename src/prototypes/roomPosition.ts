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
		value(type: LookConstant, timeout: number = 1): any[] {
			const pos = `${this.x},${this.y}`;
			const cacheResult = _.get(this.memory, ['_lookFor', pos, type]) as LookForCache;
			if (!_.isUndefined(cacheResult) && Game.time - cacheResult.time <= timeout) {
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
			let value: any[];
			switch (type) {
				case LOOK_TERRAIN:
					value = result;
				case LOOK_FLAGS:
					value = getGame.flagsToNameArray(result);
				default:
					value = getGame.objsToIdArray(result);
			}
			_.set(this.memory, ['_lookFor', pos, type], {
				time: Game.time,
				value: value,
			});
			return result;
		},
	},
});
