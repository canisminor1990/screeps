import { emoji, action, colorType, targetFormat,targetMaker } from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'build')
	if (action(creep, target, creep.build(target), emoji.build, colorType.blue)) return true;
}