import {taskHarvester, pathFinder} from '../task'
export default (creep) => {
	const room = 'W81S66';
	const myRoom = Game.spawns['Spawn1']
	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {
		if (Memory.farMiner) {
			const farMiner = Game.getObjectById(Memory.farMiner)
			creep.moveTo(farMiner)
		}
	}
	else {
		if (creep.room.name !== myRoom.room.name) {
			creep.moveTo(myRoom)
			creep.moveTo(myRoom, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}})
		} else {
			taskHarvester(creep)
		}
	}
}