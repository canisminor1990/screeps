import { emoji, action,colorType,targetFormat,targetChange } from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'heal')
	if (action(creep, target, creep.heal(target), emoji.heal, colorType.green)) return true;
}