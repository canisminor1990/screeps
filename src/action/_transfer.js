import { emoji, action } from "../_util"
export default (creep, rawTarget, type = RESOURCE_ENERGY) => {
	if (!rawTarget) return false;
	let target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	};
	console.log(target)
	action(creep, target, creep.transfer(target, type), emoji.transfer);
	return true;
}