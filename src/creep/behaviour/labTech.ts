import { CreepBehaviour } from '../Behaviour';

class LabTechBehaviour extends CreepBehaviour {
	constructor() {
		super('labTech');
	}

	inflowActions = creep => {
		return [
			CreepManager.action.reallocating,
			CreepManager.action.withdrawing,
			CreepManager.action.uncharging,
			CreepManager.action.picking,
		];
	};
	outflowActions = creep => {
		let priority = [
			CreepManager.action.storing,
			CreepManager.action.charging,
			CreepManager.action.fueling,
			CreepManager.action.feeding,
		];
		if (
			creep.sum > creep.carry.energy ||
			(!creep.room.situation.invasion &&
				SPAWN_DEFENSE_ON_ATTACK &&
				creep.room.lowDefenseEnergy &&
				creep.room.relativeEnergyAvailable > 0.8)
		) {
			priority.unshift(CreepManager.action.storing);
		}
		if (creep.room.structures.urgentRepairable.length > 0) {
			priority.unshift(CreepManager.action.fueling);
		}
		return priority;
	};
	nextAction = creep => {
		return CreepManager.behaviour.hauler.nextAction(creep);
	};
}

export default new LabTechBehaviour();
