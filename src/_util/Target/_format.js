import { findClosestByRange } from '../../Action'
export default (creep, target) => {
	if (_.isArray(target)) {
		if (target.length == 0) return false
		if (target.length == 1) {
			target = _.first(target)
		} else {
			try {
				target = findClosestByRange(creep, target);
			} catch (e) {
				console.log(e)
				target = _.first(target)
			}
		}
	}
	if (target.pos.roomName != creep.pos.roomName) {
		return false
	} else {
		try {
			target = Game.getObjectById(target.id)
			return target
		} catch (e) {
			console.log(e)
			return false
		}
	}
}