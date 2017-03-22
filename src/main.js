import 'screeps-perf';
import * as Manager from './manager'


module.exports.loop = () => {
    const roomName      = 'W81S67'
    const room          = Game.rooms[roomName]
    const roomNext          = Game.rooms['W81S66']
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

	if (roomNext){
        Manager.memory(roomNext)
        Manager.role(roomNext)
	}

	Manager.structure(room)
}



