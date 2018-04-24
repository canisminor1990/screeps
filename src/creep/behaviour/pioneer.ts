import { CreepBehaviour } from '../Behaviour';

class PioneerBehaviour extends CreepBehaviour {
	constructor() {
		super('pioneer');
	}
	inflowActions = creep => CreepManager.behaviour.worker.inflowActions(creep);
	outflowActions = creep => {
		let priority;
		if (creep.room.controller && creep.room.RCL < 2) {
			priority = [
				CreepManager.action.feeding,
				CreepManager.action.upgrading,
				CreepManager.action.building,
				CreepManager.action.repairing,
				CreepManager.action.fueling,
				CreepManager.action.fortifying,
				CreepManager.action.charging,
				CreepManager.action.storing,
				CreepManager.action.picking,
			];
		} else {
			priority = [
				CreepManager.action.feeding,
				CreepManager.action.building,
				CreepManager.action.repairing,
				CreepManager.action.fueling,
				CreepManager.action.fortifying,
				CreepManager.action.charging,
				CreepManager.action.upgrading,
				CreepManager.action.storing,
				CreepManager.action.picking,
			];
		}
		if (creep.room.controller && creep.room.controller.ticksToDowngrade < 2000) {
			// urgent upgrading
			priority.unshift(CreepManager.action.upgrading);
		}
		if (creep.sum > creep.carry.energy) {
			priority.unshift(CreepManager.action.storing);
		}
		return priority;
	};
	nextAction = creep => {
		let flag;
		if (creep.data.destiny) flag = Game.flags[creep.data.destiny.flagName];

		if (flag) {
			// not at target room
			if (!flag.room || flag.pos.roomName != creep.pos.roomName) {
				// travel to target room
				if (CreepManager.action.travelling.assignRoom(creep, flag.pos.roomName)) {
					PopManager.registerCreepFlag(creep, flag);
					return true;
				}
			}
			// if target room claimed
			if (flag.room && flag.room.my) {
				let spawnFlag = FlagManager.find(FLAG_COLOR.claim.spawn, creep.pos, true);
				// and has spawn flag
				if (spawnFlag) {
					// but spawn is complete
					if (spawnFlag.room.structures.spawns && spawnFlag.room.structures.spawns.length > 0) {
						// remove spawn flag
						spawnFlag.remove();
						// also remove exploit flags
						let remove = f => Game.flags[f.name].remove();
						_.forEach(FlagManager.filter(FLAG_COLOR.invade.exploit, spawnFlag.pos, true), remove);
					} else {
						// no spawn => build it
						let spawnSite = flag.room.myConstructionSites.some(s => s.structureType === STRUCTURE_SPAWN);
						if (!spawnSite)
							// no spawn construction site yet
							flag.room.createConstructionSite(spawnFlag, STRUCTURE_SPAWN); // create spawn construction site
					}
				}
			}
		}
		return this.nextEnergyAction(creep);
	};
}

export default new PioneerBehaviour();
