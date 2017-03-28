import { emoji } from '../_util'
import { targetFormat } from '../_util'
export default (creep, target, type = 'default') => {
	try {
		if (!creep.memory.target) creep.memory.target = {}
		if (!creep.memory.target[type]) {
			creep.memory.target[type] = {
				id  : target.id,
				pos : target.pos,
				time: Game.time
			};
		}
		return false;
	} catch (e) {
		return false;
	}
}