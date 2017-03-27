import { emoji, action,colorType } from "../_util"
export default (creep, rawTarget, type = RESOURCE_ENERGY) => {
	if (!rawTarget) return false;
	let target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	};

	if(action(creep, target, creep.transfer(target, type), emoji.transfer,colorType.purple)) return true;
}