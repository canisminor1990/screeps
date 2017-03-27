import { findClosestByRange, findInRange } from '../'
export default (creep, type = LOOK_STRUCTURES, range = 0, opt) => {
	let found = findInRange(creep,type,range)
	if (opt) found.filter(opt);
	found = findClosestByRange(creep,found)
	return found
}