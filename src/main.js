import 'screeps-perf';
import * as Manager from './manager'

module.exports.loop = () => {
	const rooms      = ['W81S67', 'W81S66'];
	// start
	Manager.root()
	Manager.memory(rooms)
	Manager.role(rooms)
	Manager.structure(rooms)
}

