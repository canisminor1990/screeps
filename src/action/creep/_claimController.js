import { emoji, action,colorType,targetFormat,targetMaker } from "../../_util"
export default (creep, target,opt = true) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'reserveController')
	if (action(creep, target, creep.reserveController(target), emoji.claim,colorType.orange)) return true;
}