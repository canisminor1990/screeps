import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw, opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!targetRaw) {
		if (moveTo(creep, target))return
	}
	targetMaker(creep, target, 'attack')
	if (action(creep, target, creep.attack(target), emoji.attack, colorType.red)) return true;

}