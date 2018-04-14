import { CreepAction } from '../../class';

class DroppingAction extends CreepAction {
	constructor() {
		super('dropping');
	}

	targetRange = 1;
	reachedRange = 0;

	isValidAction = creep => {
		return creep.sum > 0;
	};
	isValidTarget = (target, creep) => {
		if (!target) return false;
		if (target instanceof Flag) {
			return target.compareTo(FLAG_COLOR.claim.spawn) || target.compareTo(FLAG_COLOR.command.drop);
		}
		return true;
	};
	newTarget = creep => {
		// drop off at drop pile or the nearest spawn
		let drop = creep.pos.findClosestByRange(creep.room.structures.piles);
		if (!drop) {
			drop = creep.pos.findClosestByRange(creep.room.structures.spawns);
		}
		if (!drop) {
			drop = creep.pos.findClosestByRange(creep.room.find(FIND_FLAGS, Flag.flagFilter(FLAG_COLOR.claim.spawn)));
		}
		if (!drop) {
			drop = creep.pos.findClosestByRange(_.filter(creep.room.constructionSites, { structureType: STRUCTURE_SPAWN }));
		}
		if (!drop) {
			drop = creep.room.controller;
		}
		return drop;
	};
	work = creep => {
		let ret = OK;
		let isSpawnFlag = f => f && Flag.compare(f, FLAG_COLOR.claim.spawn);
		if (
			!(
				creep.target instanceof StructureSpawn ||
				creep.target instanceof ConstructionSite ||
				creep.target instanceof StructureController ||
				isSpawnFlag(creep.target)
			)
		) {
			let range = creep.pos.getRangeTo(creep.target);
			if (range > 0 && creep.data.lastPos && creep.data.path && !_.eq(creep.pos, creep.data.lastPos)) {
				// If the destination is walkable, try to move there before dropping
				let invalidObject = o => {
					return (
						(o.type == LOOK_TERRAIN && o.terrain == 'wall') ||
						o.type == LOOK_CREEPS ||
						(o.type == LOOK_STRUCTURES && OBSTACLE_OBJECT_TYPES.includes(o.structure.structureType))
					);
				};
				let look = creep.room.lookAt(creep.target);
				if (!_.some(look, invalidObject)) {
					return ret;
				}
			}
		}
		for (let resourceType in creep.carry) {
			ret = creep.drop(resourceType);
		}
		return ret;
	};
}

export default new DroppingAction();
