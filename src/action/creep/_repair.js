import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, 'repair')
		if (action(creep, target, creep.repair(target), emoji.repair, colorType.blue)) return true;
	} catch (e) {
		console.log("# Error", e)
		return false
	}
}