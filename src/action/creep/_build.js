import { emoji, action, colorType, targetFormat,targetMaker } from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw,opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		if (moveTo(creep, target))return
	}
	targetMaker(creep,target,'build')
	if (action(creep, target, creep.build(target), emoji.build, colorType.blue)) return true;
}