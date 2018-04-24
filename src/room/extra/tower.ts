import { RoomExtra } from '../Extra';

class TowerExtra extends RoomExtra {
	constructor() {
		super('tower');
	}

	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) room.saveTowers();
	};
	runRoom = (memory, roomName) => {
		const room = Game.rooms[roomName];
		if (room && room.structures.towers.length > 0) TowerManager.loop(room);
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			towerFreeCapacity: {
				get() {
					if (_.isUndefined(this._towerFreeCapacity)) {
						this._towerFreeCapacity = 0;
						let addFreeCapacity = tower => (this._towerFreeCapacity += tower.energyCapacity - tower.energy);
						_.forEach(this.structures.towers, addFreeCapacity);
					}
					return this._towerFreeCapacity;
				},
			},
			saveTowers: {
				value() {
					let towers = this.find(FIND_MY_STRUCTURES, {
						filter: { structureType: STRUCTURE_TOWER },
					});
					if (towers.length > 0) {
						let id = obj => obj.id;
						this.memory.towers = _.map(towers, id);
					} else delete this.memory.towers;
				},
			},
		});
	};
}

export default new TowerExtra();
