import { Console } from "../../_util"
export default (creep, array,range = 0, opt) => {
	try {
		let found = creep.pos.findInRange(array,range)
		if (opt) found = _.filter(found, opt);
		return found
	} catch (e) {
		Console.error('findInRange', e, creep, array, opt)
		return false
	}
}