import { CreepAction } from '../Action';

class UpgradingAction extends CreepAction {
	constructor() {
		super('upgrading');
	}

	targetRange = 3;
	reachedRange = 3;
	isAddableAction = creep => {
		// no storage
		return (
			!creep.room.storage ||
			// storage has surplus
			creep.room.storage.charge > 1 ||
			// storage is leftover from invasion and has usable energy
			(!creep.room.storage.my && creep.room.storage.store.energy > 0)
		);
	};
	isAddableTarget = (target, creep) => {
		// Limit to upgraders only at RCL8
		if (target.level === 8 && (!creep.data || creep.data.creepType !== 'upgrader')) return false;
		return true;
	};
	isValidAction = creep => {
		return creep.carry.energy > 0;
	};
	isValidTarget = target => {
		return target && target.structureType === 'controller' && target.my;
	};
	newTarget = creep => {
		const target = creep.room.controller && creep.room.controller.my ? creep.room.controller : null;
		return this.isValidTarget(target) && this.isAddableTarget(target, creep) && target;
	};
	work = (creep, range) => {
		if (range && range < 2) creep.controllerSign();
		return creep.upgradeController(creep.target);
	};
}

export default new UpgradingAction();
