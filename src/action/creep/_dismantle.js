import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!targetRaw) {
		if (moveTo(creep, target))return
	}
	targetMaker(creep,target,'dismantle')
	if (action(creep, target, creep.dismantle(target), emoji.dismantle,colorType.red)) return true;
}