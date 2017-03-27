import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
export default (creep, target, opt = true) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep, target, 'attack')
	if (action(creep, target, creep.attack(target), emoji.attack, colorType.red)) return true;

}