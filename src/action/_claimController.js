import { emoji, action } from "../_util"
export default (creep, rawTarget) => {
	if (!rawTarget) return false;
	let target = (rawTarget instanceof Array) ? rawTarget[0] : rawTarget;
	action(creep, target, creep.claimController(target), emoji.claim)
	return true;
}