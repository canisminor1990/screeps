import { CreepBehaviour } from '../Behaviour';

class RemoteWorkerBehaviour extends CreepBehaviour {
	constructor() {
		super('remoteWorker');
		this._run = this.run;
		this.run = creep => {
			if (!CreepManager.action.avoiding.run(creep)) {
				this._run(creep);
			}
		};
	}

	inflowActions = creep => {
		return [
			CreepManager.action.picking,
			CreepManager.action.uncharging,
			CreepManager.action.withdrawing,
			CreepManager.action.harvesting,
		];
	};
	outflowActions = creep => {
		return [CreepManager.action.repairing, CreepManager.action.building, CreepManager.action.recycling];
	};
	needEnergy = creep => creep.sum < creep.carryCapacity * 0.8;
	nextAction = creep => {
		const flag = creep.data.destiny && Game.flags[creep.data.destiny.targetName];
		if (!flag && (!creep.action || creep.action.name !== 'recycling')) {
			return this.assignAction(creep, 'recycling');
		} else if (creep.data.destiny.room === creep.pos.roomName) {
			// at target room
			return this.nextEnergyAction(creep);
		} else {
			// not at target room
			return this.gotoTargetRoom(creep);
		}
	};
	gotoTargetRoom = creep => {
		const targetFlag = creep.data.destiny ? Game.flags[creep.data.destiny.targetName] : null;
		if (targetFlag) return CreepManager.action.travelling.assignRoom(creep, targetFlag.pos.roomName);
	};
}

export default new RemoteWorkerBehaviour();
