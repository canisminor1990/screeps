import {debug} from '../../_util'
export default (creep, array, range = 0, opt) => {
	try {
		let found = creep.pos.findInRange(array, range)
		if (opt) found = _.filter(found, opt);
		return found
	} catch (e) {
		debug(e,'findInRange',creep, array,opt)
		return false
	}
}