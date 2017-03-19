const mySpawn = Game.spawns['Spawn1'];

const taskSpawn = (number, body) => {

	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	for (let key in number) {
		const roleSpawn = key;
		for (let i = 0; i < number[key].length; i++) {
			const maxNum = number[key][i]
			const roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn && creep.memory.source == i).length;
			if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === OK) {
				const name = `[${roleSpawn}]${getNowFormatDate()}`
				Game.spawns['Spawn1'].createCreep(
						body[key],
						name,
						{role: roleSpawn, source: i}
				);
				console.log(['Spawn:',
				             name,
				             'Source:',
				             i].join(' '));
			}
		}
	}

	if (mySpawn.spawning) {
		const spawningCreep = Game.creeps[mySpawn.spawning.name];
		mySpawn.room.visual.text(
				'[Spawn]' + spawningCreep.memory.role,
				mySpawn.pos.x + 1,
				mySpawn.pos.y,
				{align: 'left', opacity: 0.8});
	}
}

export default taskSpawn;

function getNowFormatDate() {
	const date = new Date();
	return [date.getHours(),
	        date.getMinutes(),
	        date.getSeconds()].join(':')
}