import { Is } from '../_util'
import Config from '../config'
const buildCreeps = (data) => {
	let creeps = {all: [].concat(data)}
	_.forEach(Config.role, (role, roleName) => {
		creeps[roleName] = _.remove(data, c => c.memory.role == roleName)
	})
	return creeps;
}

export default (data) => {
	let creepsMy       = _.remove(data, c => c.my),
	    creepsFriendly = _.remove(data, c => Is.firendly(c.owner)),
	    creepsHostile  = data;
	return {
		my      : buildCreeps(creepsMy),
		friendly: creepsFriendly,
		hostile : creepsHostile
	}
}