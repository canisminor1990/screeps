import { Console, Ui, Target } from "../../_util"
import { moveTo } from '../../Action'
import action from "../_action"
export default (creep, target, check = true) => {
	if (!check || !target) return;
	const actionName = 'build';
	try {
		target = Target.format(creep, target);
		if (!target) return false;
		if (target && action({
			                     creep     : creep,
			                     target    : target,
			                     actionName: actionName,
			                     fn        : creep[actionName](target),
			                     color     : Ui.c.blue
		                     })) {
			return true
		} else {
			if (moveTo(creep, target)) return true
		}
	} catch (e) {
		// Console.error(actionName, creep, JSON.stringify(target))
		return false
	}
}