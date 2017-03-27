import { emoji, action, colorType, targetFormat,targetChange } from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'build')
	if (action(creep, target, creep.build(target), emoji.build, colorType.blue)) return true;
}