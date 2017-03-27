import { emoji, action,colorType,targetFormat ,targetChange} from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'pickup')
	if (action(creep, target, creep.pickup(target), emoji.pickup, colorType.yellow)) return true;
}