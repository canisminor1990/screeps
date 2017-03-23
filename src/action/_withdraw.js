import { emoji, action } from "../_util"
export default (creep, rawTarget, type = RESOURCE_ENERGY) => {
	if (!rawTarget) return false;
	let target = (rawTarget instanceof Array) ? rawTarget[0] : rawTarget;
	action(creep, target, creep.withdraw(target, type), emoji.withdraw);
	return true;
}
