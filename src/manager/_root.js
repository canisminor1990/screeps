export default () => {
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name]
		} else {
			if (!Game.creeps[name].memory) Game.creeps[name].memory = {role: name.split('#') [0]}
		}
	}
}