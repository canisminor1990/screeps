import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
export default (creep, target,opt = true) => {
	target = targetFormat(target)
	if (!opt) return;
	if (!target) return;
	targetMaker(creep,target,'repair')
	if(action(creep, target, creep.repair(target), emoji.repair,colorType.blue)) return true;
}