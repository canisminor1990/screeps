import { emoji } from '../_util'
import { targetFormat } from '../_util'
export default (creep, target, type = 'default') => {
	target = targetFormat(target)
	try {
		if (creep.memory.target[type].id == target.id) return true;
		creep.memory.target[type] = {
			id  : target.id,
			pos : target.pos,
			time: Game.time
		};
		creep.say(emoji.targetChange)
		return true;
	} catch (e) {
		return false
	}
}