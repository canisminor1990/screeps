import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, 'dismantle')
		if (action(creep, target, creep.dismantle(target), emoji.dismantle, colorType.red)) return true
	} catch (e) {
		console.log("# Error", e)
		return false
	}
}