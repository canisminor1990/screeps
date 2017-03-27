import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
export default (creep, target,opt = true) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'dismantle')
	if (action(creep, target, creep.dismantle(target), emoji.dismantle,colorType.red)) return true;
}