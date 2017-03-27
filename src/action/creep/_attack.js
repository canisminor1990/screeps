import { emoji, action, colorType, targetFormat, targetChange } from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep, target, 'attack')
	if (action(creep, target, creep.attack(target), emoji.attack, colorType.red)) return true;

}