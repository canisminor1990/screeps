import { Console } from "../../_util"
export default (creep, array, opt) => {
	try {
		let found = creep.pos.findClosestByRange(array)
		if (opt) found = _.filter(found, opt);
		return found
	} catch (e) {
		Console.error('findClosestByRange', e, creep, array, opt)
		return false
	}
}