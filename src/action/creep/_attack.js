import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw, opt = true) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		 moveTo(creep, targetRaw);return true
	}
	targetMaker(creep, target, 'attack')
	if (action(creep, target, creep.attack(target), emoji.attack, colorType.red)) return true;

}