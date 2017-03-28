import { emoji } from '../_util'
import { targetFormat ,targetMaker} from '../_util'
export default (creep, target, type = 'default') => {
	target = targetFormat(target)
	if (!creep.memory.target[type] || !creep.memory.target[type].id){
		targetMaker(creep, target, type);
		return true;
	}
	if (creep.memory.target[type].id == target.id) return true;
	if (!target) return false;
	creep.memory.target[type] = {
		id  : target.id,
		pos : target.pos,
		time: Game.time
	};
	creep.say(emoji.targetChange)
	return true;
}