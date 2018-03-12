import {Console, Ui, Target} from "../../_util"
import {moveTo} from '../../Action'
import action from "../_action"
export default (creep, target, all = true, resType = RESOURCE_ENERGY) => {
	if (!target) return;
	const actionName = 'transfer';
	try {
		target = Target.format(creep, target);
		if (!target) return false;
		let opt = {
			creep     : creep,
			target    : target,
			actionName: actionName,
			color     : Ui.c.purple
		}
		if (all) {
			_.forEach(creep.carry, (n, type) => {
				opt.fn = creep[actionName](target, type)
				if (target && action(opt)) {
					return true
				} else {
					if (moveTo(creep, target)) return true
				}
			})
		} else {
			opt.fn = creep[actionName](target, resType)
			if (target && action(opt)) {
				return true
			} else {
				if (moveTo(creep, target)) return true
			}
		}
	} catch (e) {
		Console.error(actionName, creep, JSON.stringify(target))
		return false
	}
}


