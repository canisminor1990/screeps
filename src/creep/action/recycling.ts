import { CreepAction } from '../Action';

class RecyclingAction extends CreepAction {
	constructor() {
		super('recycling');
	}

	isValidAction = () => true;
	isAddableAction = () => true;
	isAddableTarget = () => true;
	newTarget = creep => {
		let target = null;
		if (creep.room.my && creep.room.structures.spawns.length > 0) {
			// return nearest spawn
			target = creep.pos.findClosestByRange(creep.room.structures.spawns);
		}
		if (target == null) {
			// go to home spawn
			target = Game.spawns[creep.data.motherSpawn];
		}
		if (target == null) {
			// If home spawn doesn't exist
			target = creep.pos.findClosestSpawn();
		}
		return target;
	};
	work = creep => {
		creep.target.recycleCreep(creep);
	};
}

export default new RecyclingAction();
