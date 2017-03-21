import config from '../config';
const factory = config.role;

export default (spawn) => {

	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log(['[Clean]', name].join(' '));
		}
	}

	for (let name in factory) {

		const role      = factory[name].role,
		      body      = buildBody(factory[name].body),
		      number    = factory[name].number,
		      numberSum = _.sum(number);


		for (let i in number) {
			const nowNumber = _.filter(Game.creeps, (creep) =>
			                           creep.memory.role == role &&
			                           creep.memory.source == i
			).length;

			if (number[i] > nowNumber) {

				if (Game.spawns['Spawn1'].canCreateCreep(body) === OK) {
					const name = `${role}#${getNowFormatDate()}`
					Game.spawns['Spawn1'].createCreep(body, name, {role: role, source: i}
					);
					console.log(['[Spawn]', name, 'Source:', i].join(' '));
				} else {
					return
				}
			}
		}
	}

	if (spawn.spawning) {
		const spawningCreep = Game.creeps[spawn.spawning.name];
		spawn.room.visual.text(
			'[Spawn] ' + spawningCreep.memory.role,
			spawn.pos.x + 1,
			spawn.pos.y,
			{align: 'left', opacity: 0.8});
	}
}

function getNowFormatDate() {
	const date = new Date();
	return [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds()
	].join('')
}

function buildBody(obj) {
	let array = [];
	for (let key in obj) {
		for (let num = 0; num < obj[key]; num++) {
			array.push(key)
		}
	}
	return array;
}