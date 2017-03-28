import { emoji } from '../_util'
import { targetFormat, targetMaker } from '../_util'
export default (creep, target, type = 'default') => {
	try {
		target = targetFormat(target)
		if (creep.memory.target[type].id == target.id) return true;
		creep.memory.target[type] = {
			id  : target.id,
			pos : target.pos,
			time: Game.time
		};
		creep.say(emoji.targetChange)
	} catch (e) {
		targetMaker(creep, target, type)
	}
}