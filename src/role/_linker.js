import { fullCheck, targetMaker } from '../_util'
import { transfer, pickup, withdraw, findInRange } from '../action'
export default (creep) => {
	// memory
	const isFull = fullCheck(creep)
	// task
	targetMaker(creep, creep.room.memory.structures.link.filter(link => link.id != creep.room.memory.config.linkMain)[0], 'withdraw')
	const link = Game.getObjectById(creep.memory.target.withdraw)
	// run
	if (!isFull) {
		if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 4)[0])) return;
		const container = findInRange(creep.memory.target.withdraw, creep.room.memory.structures.container, 2)[0]
		if (withdraw(creep, container, container && container.store.energy > 0))return;
	} else {
		if (transfer(creep, link, link.energy < link.energyCapacity)) return;
	}
}
