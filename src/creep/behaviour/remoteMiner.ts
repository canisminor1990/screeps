import { CreepBehaviour } from '../Behaviour';

class RemoteMinerBehaviour extends CreepBehaviour {
	constructor() {
		super('remoteMiner');
		this._run = this.run;
		this.run = creep => {
			if (!CreepManager.action.avoiding.run(creep)) {
				const flag = creep.data.destiny && Game.flags[creep.data.destiny.targetName];
				if (!flag) {
					if (!creep.action || creep.action.name !== 'recycling') {
						this.assignAction(creep, 'recycling');
					}
				} else if (creep.room.name !== creep.data.destiny.room) {
					CreepManager.action.travelling.assignRoom(creep, flag.pos.roomName);
				}
				this._run(creep);
			}
		};
	}

	actions = creep => {
		return CreepManager.behaviour.miner.actions(creep);
	};
	getEnergy = creep => {
		return CreepManager.behaviour.miner.getEnergy(creep);
	};
	maintain = creep => {
		return CreepManager.behaviour.miner.maintain(creep);
	};
}

export default new RemoteMinerBehaviour();
