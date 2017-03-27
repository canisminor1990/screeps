export default (creep, target, type, opt) => {
	let found = creep.pos.lookFor(target, type)
	if (opt) found.filter(opt);
	if (found.length) {
		return found
	} else {
		return false
	}
}