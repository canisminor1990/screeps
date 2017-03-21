import { pathFinder } from '../task'
export default (creep) => {

	if (creep.carry.energy < creep.carryCapacity) {
		const source = Game.getObjectById('5873bc3511e3e4361b4d7390');

		if (!source) {
			creep.moveTo( new RoomPosition(27, 21, 'W81S66'))
		} else {

			(creep.harvest(source) == ERR_NOT_IN_RANGE) ?
					creep.moveTo(source) : null;
		}
	}
	if (creep.carry.energy >= 50) {
		const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
			filter: tCreep => tCreep.memory.role !== 'miner'
		});

		let maxNum = 0, maxName;
		for (let name in targets) {
			let num = targets[name].carryCapacity - targets[name].carry.energy;
			if (num > maxNum) {
				maxNum  = num;
				maxName = name
			}
		}

		if (maxName, maxNum != 0) {
			creep.transfer(targets[maxName], RESOURCE_ENERGY, (maxNum > creep.carry.energy) ? creep.carry.energy : maxNum);
			creep.say('transfer:' + maxNum)
		}

	}
}
