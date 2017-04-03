import { Console } from "../../_util"
import { Target } from '../../_util'
export default (creep, target) => {
	try {
		target = Target.format(creep, target)
		return creep.pos.isEqualTo(target.pos)
	} catch (e) {
		Console.error('isEqualTo', e, creep, target)
		return false
	}
}