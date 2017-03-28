export default (creep, array, range = 0, opt) => {
	try {
		let found = creep.pos.findInRange(array, range)
		if (opt) found.filter(opt);
		return found
	} catch (e) {
		return false
	}
}