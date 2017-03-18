const taskSpawn = (number, body) => {

	for (let key in number) {
		const roleSpawn = key;
		let maxNum = 0
		for (let i = 0; i < number[key].length; i++) {
			maxNum = maxNum + number[key][i]
		}
		for (let i = 0; i < number[key].length; i++) {
			const roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
			if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === OK) {
				Game.spawns['Spawn1'].createCreep(
						body[key],
						`${roleSpawn}${Date.parse(new Date())}`,
						{role: roleSpawn, source: i}
				);
				console.log('Spawn:', roleSpawn, i);
			}
		}
	}
}

export default taskSpawn;