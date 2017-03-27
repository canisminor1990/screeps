import {emoji, action, colorType, targetFormat, targetMaker} from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw, opt = true, type = RESOURCE_ENERGY) => {
	if (!opt) return;
	let target;
	target = targetFormat(targetRaw)
	if (!target) {
		 moveTo(creep, targetRaw);return false
	}
	targetMaker(creep, target, 'withdraw')
	if (action(creep, target, creep.withdraw(target, type), emoji.withdraw, colorType.purple))return true;
}
