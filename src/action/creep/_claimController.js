import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, target, 'reserveController')
		if (action(creep, target, creep.reserveController(target), emoji.claim, colorType.orange)) return true
	} catch (e) {
		console.log("# Error", e)
		return false
	}
}