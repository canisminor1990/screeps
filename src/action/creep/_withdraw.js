import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
export default (creep, target, opt = true, type = RESOURCE_ENERGY) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep, target, 'withdraw')
	if (action(creep, target, creep.withdraw(target, type), emoji.withdraw, colorType.purple))return true;
}
