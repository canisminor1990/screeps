import { emoji, action, colorType, targetFormat ,targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true,type = RESOURCE_ENERGY) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		if (moveTo(creep, targetRaw))return
	}
	targetMaker(creep,target,'transfer')
	if (action(creep, target, creep.transfer(target, type), emoji.transfer, colorType.purple)) return true;
}