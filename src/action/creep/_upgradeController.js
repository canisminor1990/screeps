import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
export default (creep, target,opt = true) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'upgradeController')
	if(action(creep, target, creep.upgradeController(target), emoji.upgrade,colorType.orange)) return true;
}