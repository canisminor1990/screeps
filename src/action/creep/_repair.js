import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	const actionName = 'repair';
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, actionName)
		if (action(creep, target, creep[actionName](target), emoji.repair, colorType.blue)) return true;
	} catch (e) {
		console.log("# Error", actionName, e)
		return false
	}
}