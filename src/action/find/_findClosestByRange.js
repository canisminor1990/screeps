export default (creep, array, opt) => {
	if (! array instanceof Array || array.length == 0 || array[0] == null) return false
	let found = creep.pos.findClosestByRange(array)
	if (opt) found.filter(opt);
	return found
}