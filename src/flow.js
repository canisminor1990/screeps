import Setup from './Setup';
import Root from './Root';
import Rooms from './Rooms';
import Flags from './Flags';
import  Tasks from './Tasks';
import  Roles from './Roles';
import  Creeps from './Creeps';
import  Structures from './Structures';
import Config from './config'
const init = () => {
	Setup()
}
const body = () => {
	Root()
	const room = Root.room(Config.room)
	_.forEach(room, roomGroup => {
		Rooms(roomGroup)
		Flags(roomGroup)
		Tasks(roomGroup)
		Roles(roomGroup)
		Creeps(roomGroup)
		Structures(roomGroup)
	})
}

export {init as init}
export {body as body}
