import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw, check = true, type = RESOURCE_ENERGY) => {
	if (!check) return;
	const actionName = 'transfer';
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, actionName)
		if (action(creep, target, creep[actionName](target, type), emoji.transfer, colorType.purple)) return true
	} catch (e) {
		console.log("# Error", actionName, e)
		return false
	}
}