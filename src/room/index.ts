import { Component, EventClass } from '../class';
import { Install } from '../util';

class RoomClass extends Component {
	pathfinderCache = {};
	pathfinderCacheDirty = false;
	pathfinderCacheLoaded = false;
	COSTMATRIX_CACHE_VERSION = COMPRESS_COST_MATRICES ? 4 : 5; // change this to invalidate previously cached costmatrices

	extend = () => {
		// run extend in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].extend) Room.manager[key].extend();
		}
	};
	fresh = () => {
		Install(Room, {
			// ocurrs when a new invader has been spotted for the first time
			// param: invader creep
			newInvader: new EventClass(),
			// ocurrs every tick since an invader has been spotted until its not in that room anymore (will also occur when no sight until validated its gone)
			// param: invader creep id
			knownInvader: new EventClass(),
			// ocurrs when an invader is not in the same room anymore (or died). will only occur when (or as soon as) there is sight in the room.
			// param: invader creep id
			goneInvader: new EventClass(),
			// ocurrs when a room is considered to have collapsed. Will occur each tick until solved.
			// param: room
			collapsed: new EventClass(),
			// occurs when a room needs to rebuild its costMatrix
			costMatrixInvalid: new EventClass(),
			// occurs when a room's level has increased or decreased
			// param: room
			RCLChange: new EventClass(),
		});
		// run fresh in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].fresh) Room.manager[key].fresh();
		}
		let clean = room => {
			for (const key of Object.keys(Room.manager)) {
				if (Room.manager[key].freshRoom) Room.manager[key].freshRoom(room);
			}
		};
		_.forEach(Game.rooms, clean);
	};
	register = () => {
		// run register in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].register) Room.manager[key].register();
		}
		Room.costMatrixInvalid.on(room => this.rebuildCostMatrix(room.name || room));
		Room.RCLChange.on(room =>
			room.structures.all
				.filter(s => ![STRUCTURE_ROAD, STRUCTURE_WALL, STRUCTURE_RAMPART].includes(s.structureType))
				.forEach(s => {
					if (!s.isActive()) _.set(room.memory, ['structures', s.id, 'active'], false);
				}),
		);
	};
	analyze = () => {
		// run analyze in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].analyze) Room.manager[key].analyze();
		}
		const getEnvironment = room => {
			try {
				// run analyzeRoom in each of our submodules
				for (const key of Object.keys(Room.manager)) {
					if (Room.manager[key].analyzeRoom)
						Room.manager[key].analyzeRoom(room, this.needMemoryResync(room));
				}
				if (this.totalSitesChanged()) room.countMySites();
				if (this.totalStructuresChanged()) room.countMyStructures();
				room.checkRCL();
			} catch (err) {
				Game.notify(
					'Error in room.js (Room.prototype.loop) for "' + room.name + '" : ' + err.stack
						? err + '<br/>' + err.stack
						: err,
				);
				console.log(
					Util.dye(
						CRAYON.error,
						'Error in room.js (Room.prototype.loop) for "' +
							room.name +
							'": <br/>' +
							(err.stack || err.toString()) +
							'<br/>' +
							err.stack,
					),
				);
			}
		};
		_.forEach(Game.rooms, r => {
			if (r.skip) return;
			getEnvironment(r);
		});
	};
	run = () => {
		// run run in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].run) Room.manager[key].run();
		}
		let run = (memory, roomName) => {
			try {
				// run runRoom in each of our submodules
				for (const key of Object.keys(Room.manager)) {
					if (Room.manager[key].runRoom) Room.manager[key].runRoom(memory, roomName);
				}
				const room = Game.rooms[roomName];
				if (room) {
					// has sight
					if (room.collapsed) {
						Room.collapsed.trigger(room);
					}
				}
			} catch (e) {
				Util.logError(e.stack || e.message);
			}
		};
		_.forEach(Memory.rooms, (memory, roomName) => {
			run(memory, roomName);
			if (
				Game.time % MEMORY_RESYNC_INTERVAL === 0 &&
				!Game.rooms[roomName] &&
				typeof Memory.rooms[roomName].hostile !== 'boolean'
			) {
				// clean up stale room memory for rooms no longer in use, but preserve manually set 'hostile' entries
				delete Memory.rooms[roomName];
			}
		});
	};
	cleanup = () => {
		// run cleanup in each of our submodules
		for (const key of Object.keys(Room.manager)) {
			if (Room.manager[key].cleanup) Room.manager[key].cleanup();
		}
		// fresh changes to the pathfinderCache but wait until load
		if (!_.isUndefined(Memory.pathfinder)) {
			CMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, Memory.pathfinder);
			delete Memory.pathfinder;
		}
		if (this.pathfinderCacheDirty && this.pathfinderCacheLoaded) {
			// store our updated cache in the memory segment
			let encodedCache = {};
			for (const key in this.pathfinderCache) {
				const entry = this.pathfinderCache[key];
				if (entry.version === this.COSTMATRIX_CACHE_VERSION) {
					encodedCache[key] = {
						serializedMatrix:
							entry.serializedMatrix ||
							(global.COMPRESS_COST_MATRICES
								? CompressedMatrix.serialize(entry.costMatrix)
								: entry.costMatrix.serialize()),
						updated: entry.updated,
						version: entry.version,
					};
					// only set memory when we need to
					if (entry.stale) encodedCache[key].stale = true;
				}
			}
			CMemory.saveSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, encodedCache);
			this.pathfinderCacheDirty = false;
		}
	};

	totalSitesChanged = () => {
		const numSites = _.size(Game.constructionSites);
		const oldSites = Memory.rooms.myTotalSites || 0;
		if (numSites > 0) Memory.rooms.myTotalSites = numSites;
		else delete Memory.rooms.myTotalSites;
		return oldSites && oldSites !== numSites;
	};
	totalStructuresChanged = () => {
		const numStructures = _.size(Game.structures);
		const oldStructures = Memory.rooms.myTotalStructures || 0;
		if (numStructures > 0) Memory.rooms.myTotalStructures = numStructures;
		else delete Memory.rooms.myTotalStructures;
		return oldStructures && oldStructures !== numStructures;
	};
	needMemoryResync = room => {
		if (_.isUndefined(room.memory.initialized)) {
			room.memory.initialized = Game.time;
			return true;
		}
		return Game.time % global.MEMORY_RESYNC_INTERVAL === 0 || room.name == 'sim';
	};

	routeCallback = (origin, destination, options) => {
		if (_.isUndefined(origin) || _.isUndefined(destination))
			Util.logError(
				'Room.routeCallback',
				'both origin and destination must be defined - origin:' +
					origin +
					' destination:' +
					destination,
			);
		return roomName => {
			if (Game.map.getRoomLinearDistance(origin, roomName) > options.restrictDistance) return false;
			if (
				roomName !== destination &&
				ROUTE_ROOM_COST[Game.shard.name] &&
				ROUTE_ROOM_COST[Game.shard.name][roomName]
			) {
				return ROUTE_ROOM_COST[Game.shard.name][roomName];
			}
			let isHighway = false;
			if (options.preferHighway) {
				const parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
				isHighway = parsed[1] % 10 === 0 || parsed[2] % 10 === 0;
			}
			let isMyOrNeutralRoom = false;
			const hostile = _.get(Memory.rooms[roomName], 'hostile', false);
			if (options.checkOwner) {
				const room = Game.rooms[roomName];
				// allow for explicit overrides of hostile rooms using hostileRooms[roomName] = false
				isMyOrNeutralRoom =
					!hostile ||
					(room && room.controller && (room.controller.my || room.controller.owner === undefined));
			}
			if (!options.allowSK && this.isSKRoom(roomName)) return 10;
			if (!options.allowHostile && hostile && roomName !== destination && roomName !== origin) {
				return Number.POSITIVE_INFINITY;
			}
			if (isMyOrNeutralRoom || roomName == origin || roomName == destination) return 1;
			else if (isHighway) return 3;
			else if (Game.map.isRoomAvailable(roomName))
				return options.checkOwner || options.preferHighway ? 11 : 1;
			return Number.POSITIVE_INFINITY;
		};
	};
	getCostMatrix = roomName => {
		let room = Game.rooms[roomName];
		if (!room) return;
		return room.costMatrix;
	};
	isMine = roomName => {
		let room = Game.rooms[roomName];
		return room && room.my;
	};

	calcCardinalDirection = roomName => {
		const parsed = /^([WE])[0-9]+([NS])[0-9]+$/.exec(roomName);
		return [parsed[1], parsed[2]];
	};
	calcGlobalCoordinates = (roomName, callBack) => {
		if (!callBack) return null;
		const parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
		const x = +parsed[1];
		const y = +parsed[2];
		return callBack(x, y);
	};
	calcCoordinates = (roomName, callBack) => {
		if (!callBack) return null;
		return this.calcGlobalCoordinates(roomName, (x, y) => {
			return callBack(x % 10, y % 10);
		});
	};
	isCenterRoom = roomName => {
		return Room.calcCoordinates(roomName, (x, y) => {
			return x === 5 && y === 5;
		});
	};
	isCenterNineRoom = roomName => {
		return Room.calcCoordinates(roomName, (x, y) => {
			return x > 3 && x < 7 && y > 3 && y < 7;
		});
	};
	isControllerRoom = roomName => {
		return Room.calcCoordinates(roomName, (x, y) => {
			return x !== 0 && y !== 0 && (x < 4 || x > 6 || y < 4 || y > 6);
		});
	};
	isSKRoom = roomName => {
		return Room.calcCoordinates(roomName, (x, y) => {
			return x > 3 && x < 7 && y > 3 && y < 7 && (x !== 5 || y !== 5);
		});
	};
	isHighwayRoom = roomName => {
		return Room.calcCoordinates(roomName, (x, y) => {
			return x === 0 || y === 0;
		});
	};
	adjacentRooms = roomName => {
		let parts = roomName.split(/([NESW])/);
		let dirs = ['N', 'E', 'S', 'W'];
		let toggle = q => dirs[(dirs.indexOf(q) + 2) % 4];
		let names = [];
		for (let x = parseInt(parts[2]) - 1; x < parseInt(parts[2]) + 2; x++) {
			for (let y = parseInt(parts[4]) - 1; y < parseInt(parts[4]) + 2; y++) {
				names.push(
					(x < 0 ? toggle(parts[1]) + '0' : parts[1] + x) +
						(y < 0 ? toggle(parts[3]) + '0' : parts[3] + y),
				);
			}
		}
		return names;
	};
	adjacentAccessibleRooms = (roomName, diagonal = true) => {
		let validRooms = [];
		let exits = Game.map.describeExits(roomName);
		let addValidRooms = (roomName, direction) => {
			if (diagonal) {
				let roomExits = Game.map.describeExits(roomName);
				let dirA = (direction + 1) % 8 + 1;
				let dirB = (direction + 5) % 8 + 1;
				if (roomExits && roomExits[dirA] && !validRooms.includes(roomExits[dirA]))
					validRooms.push(roomExits[dirA]);
				if (roomExits && roomExits[dirB] && !validRooms.includes(roomExits[dirB]))
					validRooms.push(roomExits[dirB]);
			}
			validRooms.push(roomName);
		};
		_.forEach(exits, addValidRooms);
		return validRooms;
	};
	roomDistance = (roomName1, roomName2, diagonal, continuous) => {
		if (diagonal) return Game.map.getRoomLinearDistance(roomName1, roomName2, continuous);
		if (roomName1 == roomName2) return 0;
		let posA = roomName1.split(/([NESW])/);
		let posB = roomName2.split(/([NESW])/);
		let xDif = posA[1] == posB[1] ? Math.abs(posA[2] - posB[2]) : posA[2] + posB[2] + 1;
		let yDif = posA[3] == posB[3] ? Math.abs(posA[4] - posB[4]) : posA[4] + posB[4] + 1;
		// if( diagonal ) return Math.max(xDif, yDif); // count diagonal as 1
		return xDif + yDif; // count diagonal as 2
	};
	rebuildCostMatrix = roomName => {
		if (DEBUG)
			Util.logSystem(roomName, 'Invalidating costmatrix to force a rebuild when we have vision.');
		_.set(Room, ['pathfinderCache', roomName, 'stale'], true);
		_.set(Room, ['pathfinderCache', roomName, 'updated'], Game.time);
		this.pathfinderCacheDirty = true;
	};
	loadCostMatrixCache = cache => {
		let count = 0;
		for (const key in cache) {
			if (!this.pathfinderCache[key] || this.pathfinderCache[key].updated < cache[key].updated) {
				count++;
				this.pathfinderCache[key] = cache[key];
			}
		}
		if (DEBUG && count > 0)
			Util.logSystem(
				'RawMemory',
				'loading pathfinder cache.. updated ' + count + ' stale entries.',
			);
		this.pathfinderCacheLoaded = true;
	};
	getCachedStructureMatrix = roomName => {
		const cacheValid = roomName => {
			if (_.isUndefined(this.pathfinderCache)) {
				this.pathfinderCache = {};
				this.pathfinderCache[roomName] = {};
				return false;
			} else if (_.isUndefined(this.pathfinderCache[roomName])) {
				this.pathfinderCache[roomName] = {};
				return false;
			}
			const mem = this.pathfinderCache[roomName];
			const ttl = Game.time - mem.updated;
			if (
				mem.version === this.COSTMATRIX_CACHE_VERSION &&
				(mem.serializedMatrix || mem.costMatrix) &&
				!mem.stale &&
				ttl < COST_MATRIX_VALIDITY
			) {
				if (DEBUG && TRACE)
					Util.trace(
						'PathFinder',
						{ roomName: roomName, ttl, PathFinder: 'CostMatrix' },
						'cached costmatrix',
					);
				return true;
			}
			return false;
		};

		if (cacheValid(roomName)) {
			const cache = this.pathfinderCache[roomName];
			if (cache.costMatrix) {
				return cache.costMatrix;
			} else if (cache.serializedMatrix) {
				// disabled until the CPU efficiency can be improved
				const costMatrix = global.COMPRESS_COST_MATRICES
					? CompressedMatrix.deserialize(cache.serializedMatrix)
					: PathFinder.CostMatrix.deserialize(cache.serializedMatrix);
				cache.costMatrix = costMatrix;
				return costMatrix;
			} else {
				Util.logError(
					'Room.getCachedStructureMatrix',
					`Cached costmatrix for ${roomName} is invalid ${cache}`,
				);
				delete this.pathfinderCache[roomName];
			}
		}
	};
	getStructureMatrix = (roomName, options) => {
		const room = Game.rooms[roomName];
		let matrix;
		if (this.isSKRoom(roomName) && options.avoidSKCreeps) {
			matrix = _.get(room, 'avoidSKMatrix');
		} else {
			matrix = _.get(room, 'structureMatrix');
		}

		if (!matrix) {
			matrix = _.get(this.getCachedStructureMatrix(roomName), 'costMatrix');
		}

		return matrix;
	};
	validFields = (roomName, minX, maxX, minY, maxY, checkWalkable = false, where = null) => {
		const room = Game.rooms[roomName];
		const look = checkWalkable ? room.lookAtArea(minY, minX, maxY, maxX) : null;
		let fields = [];
		for (let x = minX; x <= maxX; x++) {
			for (let y = minY; y <= maxY; y++) {
				if (x > 1 && x < 48 && y > 1 && y < 48) {
					if (!checkWalkable || room.isWalkable(x, y, look)) {
						let p = new RoomPosition(x, y, roomName);
						if (!where || where(p)) fields.push(p);
					}
				}
			}
		}
		return fields;
	};
	// args = { spots: [{pos: RoomPosition, range:1}], checkWalkable: false, where: ()=>{}, roomName: abc ) }
	fieldsInRange = args => {
		let plusRangeX = args.spots.map(spot => spot.pos.x + spot.range);
		let plusRangeY = args.spots.map(spot => spot.pos.y + spot.range);
		let minusRangeX = args.spots.map(spot => spot.pos.x - spot.range);
		let minusRangeY = args.spots.map(spot => spot.pos.y - spot.range);
		let minX = Math.max(...minusRangeX);
		let maxX = Math.min(...plusRangeX);
		let minY = Math.max(...minusRangeY);
		let maxY = Math.min(...plusRangeY);
		return this.validFields(args.roomName, minX, maxX, minY, maxY, args.checkWalkable, args.where);
	};
	shouldRepair = (room, structure) => {
		return (
			// is not at 100%
			structure.hits < structure.hitsMax &&
			// not owned room or hits below RCL repair limit
			(!room.my ||
				structure.hits < global.MAX_REPAIR_LIMIT[room.controller.level] ||
				structure.hits <
					global.LIMIT_URGENT_REPAIRING +
						(2 * global.DECAY_AMOUNT[structure.structureType] || 0)) &&
			// not decayable or below threshold
			(!DECAYABLES.includes(structure.structureType) ||
				structure.hitsMax - structure.hits > global.GAP_REPAIR_DECAYABLE) &&
			// not pavement art
			(Memory.pavementArt[room.name] === undefined ||
				Memory.pavementArt[room.name].indexOf('x' + structure.pos.x + 'y' + structure.pos.y + 'x') <
					0) &&
			// not flagged for removal
			!Flag.list.some(
				f =>
					f.roomName == structure.pos.roomName &&
					f.color == COLOR_ORANGE &&
					f.x == structure.pos.x &&
					f.y == structure.pos.y,
			)
		);
	};
}

export default new RoomClass();
