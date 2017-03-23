export default (spawn, my, config) => {
	if (spawn.spawning) return;
	const roleFactory = config.role
	let priority      = false;
	roleFactory.forEach(roleType => {
		const roleName    = roleType.role;
		const roleTimeout = (roleType.roleTimeout) ? roleType.roleTimeout : 100;
		const roleMy      = my[roleName].sort((a, b) => a.ticksToLive - b.ticksToLive)
		let roleNeardeath = 0
		roleMy.forEach(roleCreep => {
			if (roleCreep && roleCreep.ticksToLive < roleTimeout) roleNeardeath++
		})
		const roleNumber = roleType.number - (roleMy.length - roleNeardeath);
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
