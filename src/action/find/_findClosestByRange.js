export default (creep, type = LOOK_STRUCTURES, opt) => {
	let found = creep.pos.findClosestByRange(type)
	if (opt) found.filter(opt);
	return found
}