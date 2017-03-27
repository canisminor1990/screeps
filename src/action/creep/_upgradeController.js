import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		if (moveTo(creep, targetRaw))return
	}
	if (!target) return;
	targetMaker(creep,target,'upgradeController')
	if(action(creep, target, creep.upgradeController(target), emoji.upgrade,colorType.orange)) return true;
}