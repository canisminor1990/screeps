import { emoji } from '../_util'
import { targetFormat, targetMaker } from '../_util'
export default (creep, target, type = 'default') => {
	target = targetFormat(target)
	if (!target) return false;
	if (!creep.memory.target[type]) {
		targetMaker(creep, target, type)
	} else {
		if (target.id == creep.memory.target[type].id) return true;
		creep.memory.target[type] = {
			id  : target.id,
			pos : target.pos,
			time: Game.time
		};
		creep.say(emoji.targetChange)
	}
	return true;
}