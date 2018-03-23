import { debug } from '../../_util'
export default (creep, array, opt) => {
	try {
		if (!array.length || array[0] == null) return false
		let found = creep.pos.findClosestByRange(array)
		if (opt) found = _.filter(found, opt);
		return found
	} catch (e) {
		debug(e, 'findClosestByRange', creep, array, opt)
		return false
	}
}