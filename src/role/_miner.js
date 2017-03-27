import { isFull, targetMaker } from '../_util'
import { build, harvest, repair, findClosestInRange, moveTo } from '../action'
export default (creep) => {
	const memory = creep.room.memory;
	let target;
	// root
	isFull(creep)
	//run
	targetMaker(creep, memory.sources[0].source, 'harvest')
	const harvestTarget = Game.getObjectById(creep.memory.target.harvest.id)
	if (creep.memory.full) {

	}
	if (harvest(creep, harvestTarget)) return;
}