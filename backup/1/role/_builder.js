import { fullCheck } from '../_util'
import {
	pickup,
	upgradeController,
	build,
	withdraw,
	repair,
	dismantle,
	findClosestByRange,
	findClosestInRange
} from '../action'

export default (creep) => {
	// state
	const isFull = fullCheck(creep)
	// task
	if (isFull) {
		if (build(creep, findClosestByRange(creep, creep.room.memory.structures.needBuild)))return;
		if (repair(creep, findClosestByRange(creep, creep.room.memory.structures.needFix))) return;
		if (upgradeController(creep, creep.room.controller)) return;
	} else {
		if (dismantle(creep, creep.room.memory.flags.dismantle[0])) return
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 2)[0])) return;
		if (withdraw(creep, creep.room.storage))return;
	}
}