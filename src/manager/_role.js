import * as role from '../role';
import config from '../config'
export default (room) => {
	const myCreep = room.memory.role.my;
	creepRoleRun(myCreep, config(room).role)
}

function creepRoleRun(myCreeps, configRole) {
	configRole.forEach(roleName => {
		myCreeps[roleName].forEach(creep=> role[roleName](creep))
	})
}

// Game.creeps.forEach(creep => {
// 	switch (creep.memory.role) {
// 		case 'claim':
// 			role.claim(creep)
// 			break;
// 		case 'farMiner':
// 			role.farMiner(creep)
// 			break;
// 		case 'farHarvester':
// 			role.farHarvester(creep)
// 			break;
// 		case 'harvester':
// 			role.harvester(creep)
// 			break;
// 		case 'upgrader':
// 			role.upgrader(creep);
// 			break;
// 		case 'builder':
// 			role.builder(creep)
// 			break;
// 		case 'miner':
// 			role.miner(creep);
// 			break;
// 		case 'cleaner':
// 			role.cleaner(creep)
// 			break;
// 	}
// })
