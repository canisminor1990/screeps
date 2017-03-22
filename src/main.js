import 'screeps-perf';
import * as Manager from './manager'

const roomName      = 'W81S67'
const room          = Game.rooms[roomName]
module.exports.loop = () => {
	// PathFinder.use(true);
	// cleanr
	for (let name in Memory.creeps) {
		(!Game.creeps[name]) ? delete Memory.creeps[name] : null;
		if (!Game.creeps[name].memory || !Game.creeps[name].memory.role) {
			Game.creeps[name].memory = {
				role: name.split('#') [0]
			}
		}
	}
	// start
	Manager.memory(room)
	Manager.role(room)
	Manager.structure(room)
}



