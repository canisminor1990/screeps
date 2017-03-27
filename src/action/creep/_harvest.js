import { emoji, action, colorType ,targetFormat,targetChange} from "../../_util"
export default (creep, target) => {
	target = targetFormat(target)
	if (!target) return;
	// targetChange(creep,target,'harvest')
	if (action(creep, target, creep.harvest(target), emoji.harvest, colorType.yellow)) return true;
}