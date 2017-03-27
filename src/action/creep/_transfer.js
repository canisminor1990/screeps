import { emoji, action, colorType, targetFormat ,targetMaker} from "../../_util"
export default (creep, target,opt = true,type = RESOURCE_ENERGY) => {
	if (!opt) return;
	target = targetFormat(target)
	if (!target) return;
	targetMaker(creep,target,'transfer')
	if (action(creep, target, creep.transfer(target, type), emoji.transfer, colorType.purple)) return true;
}