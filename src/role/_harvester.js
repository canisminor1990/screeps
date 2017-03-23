import { pathFinder } from '../task'
export default (creep, dropped = []) => {

	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {

		let pickupTarget = [];
		if (dropped.length > 0) {
			pickupTarget = creep.pos.findInRange(dropped, 5);
		}

		if (pickupTarget.length > 0) {
			(creep.pickup(pickupTarget[0]) != OK) ? pathFinder(creep, pickupTarget[0]) : null
		} else {
			let transferTarget = _.filter(creep.room.memory.structures.container,
			                              container => container.id != '58d31e9dbbb5793fe9d0ad71'
			)
			transferTarget     = transferTarget.sort((a, b) => b.store.enengy - a.store.enengy)[0];
			(transferTarget && creep.withdraw(transferTarget, RESOURCE_ENERGY) != OK)
				? pathFinder(creep, transferTarget) : null
		}
	}

	if (creep.memory.full) {
		const needFill = creep.room.memory.structures.needFill;
		let needFillTarget;
		if (needFill.length > 0) {
			needFillTarget = creep.pos.findClosestByRange(needFill);
		} else {
			needFillTarget = creep.room.storage
		}
		(needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK)
			? pathFinder(creep, needFillTarget) : null

	}
}