export default (command, flag) => {
	let target
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target
	}
	// pos
	target = flag;
	
	return target
}