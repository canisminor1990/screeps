export default (creep, array, opt) => {
	if (!array.length || array[0] == null) return false
	let found = creep.pos.findClosestByRange(array)
	if (opt) found.filter(opt);
	return found
}