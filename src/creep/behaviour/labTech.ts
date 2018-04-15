import { CreepBehaviour } from '../../class';

class LabTechBehaviour extends CreepBehaviour {
	constructor() {
		super('labTech');
	}

	inflowActions = creep => {
		return [
			Creep.action.reallocating,
			Creep.action.withdrawing,
			Creep.action.uncharging,
			Creep.action.picking,
		];
	};
	outflowActions = creep => {
		let priority = [
			Creep.action.storing,
			Creep.action.charging,
			Creep.action.fueling,
			Creep.action.feeding,
		];
		if (
			creep.sum > creep.carry.energy ||
			(!creep.room.situation.invasion &&
				SPAWN_DEFENSE_ON_ATTACK &&
				creep.room.conserveForDefense &&
				creep.room.relativeEnergyAvailable > 0.8)
		) {
			priority.unshift(Creep.action.storing);
		}
		if (creep.room.structures.urgentRepairable.length > 0) {
			priority.unshift(Creep.action.fueling);
		}
		return priority;
	};
	nextAction = creep => {
		return Creep.behaviour.hauler.nextAction(creep);
	};
}

export default new LabTechBehaviour();
