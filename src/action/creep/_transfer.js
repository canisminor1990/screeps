import { emoji, action, colorType, targetFormat ,targetChange} from "../../_util"
export default (creep, target, type = RESOURCE_ENERGY) => {
	target = targetFormat(target)
	if (!target) return;
	targetChange(creep,target,'transfer')
	if (action(creep, target, creep.transfer(target, type), emoji.transfer, colorType.purple)) return true;
}