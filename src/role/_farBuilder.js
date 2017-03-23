import { pathFinder } from '../task'
export default (creep, newRoom) => {
	const room          = Game.spawns['Spawn1'].room;
	const newRoomMemory = newRoom.memory;
	const farMiner      = newRoomMemory.creeps.my.farMiner;
	const enemy         = newRoomMemory.creeps.enemy;
	const needBuild     = newRoomMemory.structures.needBuild;

	if (enemy.length > 0) {
		const enemyTarget = creep.pos.findClosestByRange(enemy);
		(enemyTarget && creep.attack(enemyTarget) != OK)
			? pathFinder(creep, enemyTarget) : null;
		return;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity || !farMiner.length > 0) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {
		const farMinerTarget = Game.getObjectById(farMiner[0].id);
		pathFinder(creep, farMinerTarget)
	}
	else {


		if (needBuild.length > 0) {
			const buildTarget = creep.pos.findClosestByRange(needBuild);
			(buildTarget && creep.build(buildTarget) != OK)
				? pathFinder(creep, buildTarget) : null;
		} else {

			( creep.transfer(room.storage, RESOURCE_ENERGY) !== OK)
				? pathFinder(creep, room.storage) : null
		}
	}

}