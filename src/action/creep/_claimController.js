import { emoji, action,colorType,targetFormat,targetChange } from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'reserveController')
	if (action(creep, target, creep.reserveController(target), emoji.claim,colorType.orange)) return true;
}