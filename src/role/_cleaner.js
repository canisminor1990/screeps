import {fullCheck} from '../_util'
import {pickup, transfer, withdraw, findClosestByRange,moveTo} from '../action'
export default (creep) => {
	// state
	const isFull   = fullCheck(creep)
	const needFill = _.compact(creep.room.memory.structures.needFill);
	// task
	if (!isFull) {
		if (!creep.memory.name.match('Sec')) {
			const linkMain = Game.getObjectById(creep.room.memory.config.linkMain);
			if (withdraw(creep, linkMain, linkMain.energy > 0)) return;
			if (!needFill || needFill.length == 0) {
				if (pickup(creep, findClosestByRange(creep, creep.room.memory.dropped.energy))) return;
			}
		} else {
			if (creep.pos.roomName !== 'W82S67' && moveTo(creep,Game.spawns['Spawn2']))  return
			if (pickup(creep, findClosestByRange(creep, creep.room.memory.dropped.energy))) return;
		}
		
		if (withdraw(creep, creep.room.storage)) return;
	} else {
		if (transfer(creep, creep.pos.findClosestByRange(needFill))) return;
		const tower = creep.room.memory.structures.tower.sort((a, b) => a.energy - b.energy)[0];
		if (transfer(creep, tower, tower.energy < tower.energyCapacity)) return;
		if (transfer(creep, creep.room.storage)) return;
	}
}
