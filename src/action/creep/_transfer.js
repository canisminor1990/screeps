import { emoji, action, colorType, targetFormat ,targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true,type = RESOURCE_ENERGY) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!targetRaw) {
		if (moveTo(creep, target))return
	}
	targetMaker(creep,target,'transfer')
	if (action(creep, target, creep.transfer(target, type), emoji.transfer, colorType.purple)) return true;
}