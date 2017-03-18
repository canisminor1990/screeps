const taskSpawn = (roleSpawn, maxNum) => {
	const roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
	if (roleNumber < maxNum) {
		const newName = Game.spawns['Spawn1'].createCreep(
				[WORK,
				 CARRY,
				 MOVE],
				`${roleSpawn}${Math.floor(Math.random() * 10)}`,
				{role: roleSpawn}
		);
		console.log('Spawn: ' + newName);
	}
}

export default taskSpawn;