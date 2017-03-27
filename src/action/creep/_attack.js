import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw, opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		if (moveTo(creep, targetRaw))return
	}
	targetMaker(creep, target, 'attack')
	if (action(creep, target, creep.attack(target), emoji.attack, colorType.red)) return true;

}