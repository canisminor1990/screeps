import { CreepBehaviour } from '../../class';

class RemoteWorkerBehaviour extends CreepBehaviour {
	constructor() {
		super('remoteWorker');
		this._run = this.run;
		this.run = creep => {
			if (!Creep.action.avoiding.run(creep)) {
				this._run(creep);
			}
		};
	}

	inflowActions = creep => {
		return [
			Creep.action.picking,
			Creep.action.uncharging,
			Creep.action.withdrawing,
			Creep.action.harvesting,
		];
	};
	outflowActions = creep => {
		return [Creep.action.repairing, Creep.action.building, Creep.action.recycling];
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
		if (targetFlag) return Creep.action.travelling.assignRoom(creep, targetFlag.pos.roomName);
	};
}

export default new RemoteWorkerBehaviour();
