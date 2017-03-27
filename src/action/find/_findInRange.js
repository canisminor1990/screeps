export default (creep, type = LOOK_STRUCTURES, range = 0, opt) => {
	let found = creep.pos.findInRange(type, range)
	if (opt) found.filter(opt);
	return found
}