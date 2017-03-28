import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw, opt = true, type = RESOURCE_ENERGY) => {
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, targetRaw, 'withdraw')
		if (action(creep, target, creep.withdraw(target, type), emoji.withdraw, colorType.purple))return true
	} catch (e) {
		console.log("# Error", e)
		return false
	}
}
