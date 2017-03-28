import { emoji, action, colorType, targetFormat, targetChanger } from "../../_util"
import { moveTo } from '../'
export default (creep, targetRaw) => {
	try {
		const target = targetFormat(targetRaw)
		if (!target && moveTo(creep, targetRaw)) return true
		targetChanger(creep, target, 'build')
		if (action(creep, target, creep.build(target), emoji.build, colorType.blue)) return true
	} catch (e) {
		console.log("# Error", e)
		return false
	}
}