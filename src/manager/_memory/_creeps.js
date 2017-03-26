import { isFriend } from '../../_util';

export default (room, config) => {
	const creeps      = room.find(FIND_CREEPS),
	      creepsMyRaw = _.filter(creeps, creep => creep.my),
	      creepsOther = _.filter(creeps, creep => !creep.my),
	      creepsMy    = creepRole(creepsMyRaw, config.role);
	


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