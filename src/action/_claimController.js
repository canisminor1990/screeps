import { emoji, action } from "../_util"
export default (creep, rawTarget) => {
	if (!rawTarget) return false;
	let target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (rawTarget.length == 0) return false;
		target = target[0];
	}
	action(creep, target, creep.claimController(target), emoji.claim)
	return true;
}