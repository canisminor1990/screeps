import { taskHarvester, pathFinder } from '../task'
export default (creep) => {
	const room   = 'W81S66';
	const myRoom = Game.spawns['Spawn1']
	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {
		const source = Game.getObjectById('5873bc3511e3e4361b4d7390');
		if (!source) {
			pathFinder(creep, new RoomPosition(27, 21, room))
		} else {
			const miner = creep.pos.findInRange(FIND_MY_CREEPS, 5, {filter: creepRole => creepRole.memory.role == 'farMiner'})[0]
			if (!miner) {
				(creep.harvest(source) == ERR_NOT_IN_RANGE) ?
				pathFinder(creep, source) : null;
			} else {
				pathFinder(creep, miner)
			}
		}

	}
	else {
		if (creep.room.name !== myRoom.room.name) {
			pathFinder(creep, myRoom)
		} else {
			taskHarvester(creep)
		}
	}
}