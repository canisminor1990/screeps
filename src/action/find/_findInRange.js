export default (creep, array, range = 0, opt) => {
	if (!creep || !creep.pos || !array.length || array[0] == null) return false
	let found = creep.pos.findInRange(array, range)
	if (opt) found.filter(opt);
	return found
}