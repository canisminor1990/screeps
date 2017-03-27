import { emoji, action,colorType ,targetFormat,targetChange} from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'dismantle')
	if (action(creep, target, creep.dismantle(target), emoji.dismantle,colorType.red)) return true;
}