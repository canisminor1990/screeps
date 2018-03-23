export default (command, flag) => {
	let target
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target
	}
	// creep
	const structures = flag.pos.findInRange(FIND_STRUCTURES, 0)
	if (structures.length > 0) {
		target = structures[0]
	}
	return target
}