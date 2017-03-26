export default (command, flag) => {
	let target
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target
	}
	// creep
	const enemyCreep = flag.pos.findInRange(flag.room.memory.creeps.enemy, 6)
	if (enemyCreep.length > 0) {
		target = enemyCreep[0]
	}
	// structures
	const enemyStructures = flag.pos.findInRange(flag.room.memory.structures.enemy, 6)
	if (enemyStructures.length > 0) {
		target = enemyStructures[0]
	}
	return target
}