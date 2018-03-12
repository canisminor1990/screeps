import { Console } from "../../_util"
import { Target } from '../../_util'
export default (creep, target) => {
	try {
		target = Target.format(creep, target)
		return creep.pos.isNearTo(target.pos)
	} catch (e) {
		Console.error('isNearTo', e, creep, target)
		return false
	}
}