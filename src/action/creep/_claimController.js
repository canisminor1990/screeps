import { emoji, action, colorType, targetFormat, targetChanger,debug  } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw,check = true) => {
	if (!check) return;
	const actionName = 'reserveController';
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, target, actionName)
		if (action(creep, target, creep[actionName](target), emoji.claim, colorType.orange)) return true
	} catch (e) {
		debug(e,actionName,creep, targetRaw)
		return false
	}
}