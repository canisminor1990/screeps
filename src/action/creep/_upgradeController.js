import { emoji, action,colorType ,targetFormat,targetChange} from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'upgradeController')
	if(action(creep, target, creep.upgradeController(target), emoji.upgrade,colorType.orange)) return true;
}