import { getGame } from '../utils';

Object.defineProperties(RoomPosition.prototype, {
	raw: {
		get(): Pos {
			return {
				x: this.x,
				y: this.y,
				roomName: this.roomName,
			};
		},
	},
	room: {
		get(): Room {
			return Game.rooms[this.roomName];
		},
	},
	memory: {
		get(): any {
			return this.room.memory;
		},
		set(value): void {
			this.room.memory = value;
		},
	},
	terrain: {
		get(): Terrain {
			return this.cacheLookFor(LOOK_TERRAIN)[0];
		},
	},
	structures: {
		get(): Structure[] {
			return this.cacheLookFor(LOOK_STRUCTURES);
		},
	},
	mainStructure: {
		get(): Structure | undefined {
			return _.filter(
				this.structures,
				(s: Structure) => s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_ROAD,
			)[0];
		},
	},
	constructionSite: {
		get(): ConstructionSite | undefined {
			return this.cacheLookFor(LOOK_CONSTRUCTION_SITES)[0];
		},
	},
	creep: {
		get(): Creep | undefined {
			return this.cacheLookFor(LOOK_CREEPS)[0];
		},
	},
	canMoveThrough: {
		get(): boolean {
			return (
				this.terrain !== 'wall' &&
				(_.isUndefined(this.constructionSite) ||
					this.constructionSite.structureType === (STRUCTURE_ROAD || STRUCTURE_RAMPART)) &&
				(_.isUndefined(this.mainStructure) || this.mainStructure.structureType === STRUCTURE_CONTAINER)
			);
		},
	},
	canBuild: {
		get(): boolean {
			return this.terrain !== 'wall' && _.isUndefined(this.constructionSite) && _.isUndefined(this.mainStructure);
		},
	},
});

// ////////////////////////////////
// Functions
// ////////////////////////////////

RoomPosition.prototype.getAdjacentPos = function(range: number): RoomPosition[] {
	const AdjacentPos = [];
	for (let _x = -range; _x <= range; _x++) {
		for (let _y = -range; _y <= range; _y++) {
			const x = this.x + _x;
			const y = this.y + _y;
			if (x >= 0 && x <= 49 && y >= 0 && y <= 49) AdjacentPos.push(new RoomPosition(x, y, this.roomName));
		}
	}
	return AdjacentPos;
};

RoomPosition.prototype.getCanBuildSpaces = function(range: number): RoomPosition[] {
	return _.filter(this.getAdjacentPos(range), (pos: RoomPosition) => pos.canBuild);
};

RoomPosition.prototype.getStructure = function(type: StructureConstant): Structure | undefined {
	return _.filter(this.structures, (s: Structure) => s.structureType === type)[0];
};

RoomPosition.prototype.getPositionInDirection = function(direction: number): RoomPosition {
	switch (direction) {
		case TOP:
			return new RoomPosition(this.x, this.y - 1, this.roomName);
		case TOP_RIGHT:
			return new RoomPosition(this.x + 1, this.y - 1, this.roomName);
		case RIGHT:
			return new RoomPosition(this.x + 1, this.y, this.roomName);
		case BOTTOM_RIGHT:
			return new RoomPosition(this.x + 1, this.y + 1, this.roomName);
		case BOTTOM:
			return new RoomPosition(this.x, this.y + 1, this.roomName);
		case BOTTOM_LEFT:
			return new RoomPosition(this.x - 1, this.y + 1, this.roomName);
		case LEFT:
			return new RoomPosition(this.x - 1, this.y, this.roomName);
		case TOP_LEFT:
			return new RoomPosition(this.x - 1, this.y - 1, this.roomName);
		default:
			return new RoomPosition(this.x, this.y, this.roomName);
	}
};

RoomPosition.prototype.cacheLookFor = function(type: LookConstant, timeout: number = 1): any[] {
	if (type === LOOK_TERRAIN) timeout = 60;

	const pos = `X${this.x}Y${this.y}`;
	const cacheResult = _.get(Memory, ['_lookFor', pos, type]) as LookForCache;

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
	console.log(type, LOOK_TERRAIN);
	switch (type) {
		case LOOK_TERRAIN:
			value = result[0];
			break;
		case LOOK_FLAGS:
			value = getGame.flagsToNameArray(result);
			break;
		default:
			value = getGame.objsToIdArray(result);
			break;
	}
	_.set(Memory, ['_lookFor', pos, type], {
		time: Game.time,
		value: value,
	});
	return result;
};
