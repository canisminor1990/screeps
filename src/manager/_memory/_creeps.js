import { isFriend } from '../../_util';

export default (room, config) => {
	const creeps      = room.find(FIND_CREEPS),
	      creepsMyRaw = _.filter(creeps, creep => creep.my),
	      creepsOther = _.filter(creeps, creep => !creep.my),
	      creepsMy    = creepRole(creepsMyRaw, config.role);
	
	let creepArray = {}
	for (let name in Game.creeps) {
		let creep = Game.creeps[name]
		if (!creepArray[creep.memory.role])creepArray[creep.memory.role] = [];
		creepArray[creep.memory.role].push(Game.creeps[name])
	}
	
	Memory.global.creeps = creepArray;

	return {
		my    : creepsMy,
		friend: _.filter(creepsOther, creep => isFriend(creep.owner.username)),
		enemy : _.filter(creepsOther, creep => !isFriend(creep.owner.username))
	}
}

function creepRole(creepsMyRaw, configRole) {
	let creepsMy = {}
	configRole.forEach(role => {
		creepsMy[role.role] = _.filter(creepsMyRaw, creep => creep.name.split('#')[0] == role.role)
	})
	return creepsMy
}