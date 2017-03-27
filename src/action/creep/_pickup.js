import { emoji, action,colorType,targetFormat ,targetMaker} from "../../_util"
export default (creep, target,opt = true) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'pickup')
	if (action(creep, target, creep.pickup(target), emoji.pickup, colorType.yellow)) return true;
}