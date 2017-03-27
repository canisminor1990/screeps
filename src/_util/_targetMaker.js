import { emoji } from '../_util'
import { targetFormat } from '../_util'
export default (creep, target, type = 'default') => {
	target = targetFormat(target)
	if (!target) return false;
	if (!creep.memory.target) creep.memory.target = {};
	if (!creep.memory.target[type]) {
		creep.memory.target[type] = {}
		creep.say(emoji.target)
	} else {
		if (target.id == creep.memory.target[type].id) return true;
		creep.say(emoji.targetChange)
	}
	creep.memory.target[type] = {
		id  : target.id,
		pos : target.pos,
		time: Game.time
	};
	return true;
}