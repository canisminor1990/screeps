import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	const actionName = 'upgradeController';
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, actionName)
		if (action(creep, target, creep[actionName](target), emoji.upgrade, colorType.orange)) return true
	} catch (e) {
		console.log("# Error",actionName, e)
		return false
	}
}