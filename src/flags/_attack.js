export default (command) => {
	let target
	// nocommand id
	if (command) {
		target = Game.getObjectById(command.replace(' ', ''));
		target    = target[0]
	}
	// creep
	target = pos.findInRange(creep.room.memory.creeps.enemy, 6)
	if (target.length > 0) {
		target = target[0]
	}
	// structures
	target = creep.pos.findInRange(creep.room.memory.structures.enemy, 6)
	if (target.length > 0) {
		target = target[0]
	}
}