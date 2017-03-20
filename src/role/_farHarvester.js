import { taskHarvester } from '../task'
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
			creep.moveTo(new RoomPosition(27, 21, 'W81S66'), {
				reusePath         : 8,
				visualizePathStyle: {stroke: '#ffffff'}
			})
		} else {
			const miner = creep.pos.findInRange(FIND_MY_CREEPS, 5, {filter: creepRole => creepRole.memory.role == 'farMiner'})[0]

			if (!miner) {
				(creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {
					                                            reusePath         : 8,
					                                            visualizePathStyle: {stroke: '#ffffff'}
				                                            }) : null;
			} else {
				creep.moveTo(miner, {
					reusePath         : 8,
					visualizePathStyle: {stroke: '#ffffff'}
				})
			}
		}


	}
	else {
		if (creep.room.name !== myRoom.room.name) {
			creep.moveTo(myRoom, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}})
		} else {
			taskHarvester(creep)
		}
	}
}