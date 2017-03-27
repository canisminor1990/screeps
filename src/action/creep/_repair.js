import { emoji, action,colorType ,targetFormat,targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		 moveTo(creep, targetRaw);return true
	}
	targetMaker(creep,target,'repair')
	if(action(creep, target, creep.repair(target), emoji.repair,colorType.blue)) return true;
}