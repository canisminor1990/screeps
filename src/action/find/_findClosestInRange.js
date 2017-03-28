import { findClosestByRange, findInRange } from '../'
import {debug} from '../../_util'
export default (creep, array, range = 0, opt) => {
	try {
		if (!array.length || array[0] == null) return false
		let found = findInRange(creep, array, range)
		if (opt) found.filter(opt);
		found = findClosestByRange(creep, found)
		return found
	} catch (e) {
		debug(e,'findClosestInRange',creep, array)
		return false
	}
}