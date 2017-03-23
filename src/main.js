import 'screeps-perf';
import * as Manager from './manager'

module.exports.loop = () => {
	const rooms      = ['W81S67', 'W81S66'];

	for (let name in Memory.creeps) {
		(!Game.creeps[name]) ? delete Memory.creeps[name] : null;
		if (!Game.creeps[name].memory) {
			Game.creeps[name].memory = {
				role: name.split('#') [0]
			}
		}
	}
	// start
	Manager.root()
	Manager.memory(rooms)
	Manager.role(rooms)
	Manager.structure(rooms)
}

