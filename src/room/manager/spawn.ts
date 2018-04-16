import { RoomManager } from '../../class';

class SpawnManager extends RoomManager {
	constructor() {
		super('spawn');
	}
	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) {
			room.saveSpawns();
		}
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			spawnQueueHigh: {
				get() {
					if (_.isUndefined(this.memory.spawnQueueHigh)) {
						this.memory.spawnQueueHigh = [];
					}
					return this.memory.spawnQueueHigh;
				},
			},
			spawnQueueMedium: {
				get() {
					if (_.isUndefined(this.memory.spawnQueueMedium)) {
						this.memory.spawnQueueMedium = [];
					}
					return this.memory.spawnQueueMedium;
				},
			},
			spawnQueueLow: {
				get() {
					if (_.isUndefined(this.memory.spawnQueueLow)) {
						this.memory.spawnQueueLow = [];
					}
					return this.memory.spawnQueueLow;
				},
			},
			saveSpawns: {
				value() {
					let spawns = this.find(FIND_MY_SPAWNS);
					if (spawns.length > 0) {
						let id = o => o.id;
						this.memory.spawns = _.map(spawns, id);
					} else delete this.memory.spawns;
				},
			},
		});
	};
	roomExtend = () => {
		this.assignRoom({
			bestSpawnRoomFor: targetRoomName => {
				let range = room => (room.my ? Util.routeRange(room.name, targetRoomName) : Infinity);
				return _.min(Game.rooms, range);
			},
			findSpawnRoom: params => {
				if (!params || !params.targetRoom) return null;
				// filter validRooms
				let isValidRoom = room =>
					room.my &&
					(params.maxRange === undefined || Util.routeRange(room.name, params.targetRoom) <= params.maxRange) &&
					(params.minEnergyCapacity === undefined || params.minEnergyCapacity <= room.energyCapacityAvailable) &&
					(params.minEnergyAvailable === undefined || params.minEnergyAvailable <= room.energyAvailable) &&
					(room.name != params.targetRoom || params.allowTargetRoom === true) &&
					(params.minRCL === undefined || room.controller.level >= params.minRCL) &&
					(params.callBack === undefined || params.callBack(room));
				let validRooms = _.filter(Game.rooms, isValidRoom);
				if (validRooms.length == 0) return null;
				// select "best"
				// range + roomLevelsUntil8/rangeRclRatio + spawnQueueDuration/rangeQueueRatio
				let queueTime = queue => _.sum(queue, c => c.parts.length * 3);
				let roomTime = room =>
					(queueTime(room.spawnQueueLow) * 0.9 +
						queueTime(room.spawnQueueMedium) +
						queueTime(room.spawnQueueHigh) * 1.1) /
					room.structures.spawns.length;
				let evaluation = room => {
					return (
						Util.routeRange(room.name, params.targetRoom) +
						(8 - room.controller.level) / (params.rangeRclRatio || 3) +
						roomTime(room) / (params.rangeQueueRatio || 51)
					);
				};
				return _.min(validRooms, evaluation);
			},
		});
	};
}

export default new SpawnManager();
