import { CreepBehaviour } from '../Behaviour';

class CollapseWorkerBehaviour extends CreepBehaviour {
	constructor() {
		super('collapseWorker');
		this.mergeState({
			default: {
				canWithdrawEnergy: (creep, target) => amount => amount > 0,
			},
		});
	}

	inflowActions = creep => {
		let priority = [
			CreepManager.action.picking,
			CreepManager.action.withdrawing,
			CreepManager.action.uncharging,
			CreepManager.action.harvesting,
			CreepManager.action.dismantling,
			CreepManager.action.reallocating,
		];
		if (creep.sum > creep.carry.energy) {
			priority.unshift(CreepManager.action.storing);
		}
		return priority;
	};
	outflowActions = creep => {
		const invasion = creep.room.situation.invasion && creep.room.controller && creep.room.RCL > 2;
		if (invasion) {
			return [CreepManager.action.feeding, CreepManager.action.fueling, CreepManager.action.repairing];
		} else {
			let priority = [
				CreepManager.action.feeding,
				CreepManager.action.fueling,
				CreepManager.action.charging,
				CreepManager.action.repairing,
				CreepManager.action.building,
				CreepManager.action.fortifying,
				CreepManager.action.upgrading,
			];
			if (!invasion) {
				priority.push(CreepManager.action.storing);
				priority.push(CreepManager.action.dropping);
			}
			if (creep.room.controller && creep.room.controller.ticksToDowngrade < 500) {
				// urgent upgrading
				priority.unshift(CreepManager.action.upgrading);
			}
			return priority;
		}
	};
	needEnergy = creep => CreepManager.behaviour.worker.needEnergy(creep);
	nextAction = creep => {
		if (creep.pos.roomName !== creep.data.homeRoom) {
			if (LOG_TRACE)
				Log.trace('Behaviour', {
					actionName: 'travelling',
					behaviourName: this.name,
					creepName: creep.name,
					assigned: true,
					Behaviour: 'nextAction',
					Action: 'assign',
				});
			CreepManager.action.travelling.assignRoom(creep, creep.data.homeRoom);
			return true;
		}
		if (!creep.room.collapsed) {
			Util.set(creep, ['data', 'recycleTick'], Game.time + 50);
			if (Game.time >= creep.data.recycleTick) {
				if (LOG_TRACE)
					Log.trace('Behaviour', {
						actionName: 'recycling',
						behaviourName: this.name,
						creepName: creep.name,
						assigned: true,
						Behaviour: 'nextAction',
						Action: 'assign',
					});
				return this.assignAction(creep, 'recycling');
			}
		}
		return CreepManager.behaviour.worker.nextAction(creep);
	};
}

export default new CollapseWorkerBehaviour();
