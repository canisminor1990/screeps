export default (spawn, my, config) => {
	if (spawn.spawning) return;
	const roleFactory = config.role
	let priority      = false;
	roleFactory.forEach(roleType => {
		const roleName    = roleType.role;
		const roleTimeout = (roleType.roleTimeout) ? roleType.roleTimeout : 10;
		const roleMy      = _.filter(my[roleName],roleCreep => roleCreep.ticksToLive > roleTimeout)
		const roleNumber = roleType.number - roleMy.length;
		if (roleNumber <= 0 || priority) return;
		const spawnName = buildName(roleName)
		spawn.createCreep(buildBody(roleType.body), spawnName, {role: roleName});
		if (spawn.spawning) {
			console.log('Spawn', spawnName);
			spawn.room.visual.text(
				'[Spawn] ' + spawnName,
				spawn.pos.x + 1,
				spawn.pos.y,
				{align: 'left', opacity: 0.8});
		} else {
			priority = true;
		}
	})

}

function buildName(role) {
	const date = new Date();
	return [
		role,
		"#",
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
