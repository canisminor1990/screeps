import { Console } from '../_util'
export default () => {
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name]
			Console.warn('Creeps', 'Goodbye', name, '!')
		}
	}
}