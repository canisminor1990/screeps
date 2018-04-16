import { CreepBehaviour } from '../../class';

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
			Creep.action.picking,
			Creep.action.withdrawing,
			Creep.action.uncharging,
			Creep.action.harvesting,
			Creep.action.dismantling,
			Creep.action.reallocating,
		];
		if (creep.sum > creep.carry.energy) {
			priority.unshift(Creep.action.storing);
		}
		return priority;
	};
	outflowActions = creep => {
		const invasion = creep.room.situation.invasion && creep.room.controller && creep.room.controller.level > 2;
		if (invasion) {
			return [Creep.action.feeding, Creep.action.fueling, Creep.action.repairing];
		} else {
			let priority = [
				Creep.action.feeding,
				Creep.action.fueling,
				Creep.action.charging,
				Creep.action.repairing,
				Creep.action.building,
				Creep.action.fortifying,
				Creep.action.upgrading,
			];
			if (!invasion) {
				priority.push(Creep.action.storing);
				priority.push(Creep.action.dropping);
			}
			if (creep.room.controller && creep.room.controller.ticksToDowngrade < 500) {
				// urgent upgrading
				priority.unshift(Creep.action.upgrading);
			}
			return priority;
		}
	};
	needEnergy = creep => Creep.behaviour.worker.needEnergy(creep);
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
			Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
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
		return Creep.behaviour.worker.nextAction(creep);
	};
}

export default new CollapseWorkerBehaviour();
