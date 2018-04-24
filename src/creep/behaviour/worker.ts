import { CreepBehaviour } from '../Behaviour';

class WorkerBehaviour extends CreepBehaviour {
	constructor() {
		super('worker');
	}

	inflowActions = creep => {
		let priority = [
			CreepManager.action.bulldozing,
			CreepManager.action.picking,
			CreepManager.action.dismantling,
			CreepManager.action.withdrawing,
			CreepManager.action.uncharging,
			CreepManager.action.harvesting,
			CreepManager.action.reallocating,
		];
		if (creep.sum > creep.carry.energy) {
			priority.unshift(CreepManager.action.storing);
		}
		return priority;
	};
	outflowActions = creep => {
		if (creep.room.situation.invasion && creep.room.controller && creep.room.RCL > 2) {
			return [CreepManager.action.fueling, CreepManager.action.feeding, CreepManager.action.repairing];
		} else {
			let priority = [
				CreepManager.action.repairing,
				CreepManager.action.feeding,
				CreepManager.action.building,
				CreepManager.action.fueling,
				CreepManager.action.fortifying,
				CreepManager.action.charging,
				CreepManager.action.upgrading,
				CreepManager.action.storing,
			];
			const needMinersOrHaulers = room => {
				const typeCount = room.population && room.population.typeCount;
				return !typeCount.hauler || typeCount.hauler < 1 || !typeCount.miner || typeCount.miner < 1;
			};
			if (creep.room.relativeEnergyAvailable < 1 && needMinersOrHaulers(creep.room)) {
				priority.unshift(CreepManager.action.feeding);
			}
			if (creep.room.controller && creep.room.controller.ticksToDowngrade < 2000) {
				// urgent upgrading
				priority.unshift(CreepManager.action.upgrading);
			}
			if (creep.sum > creep.carry.energy) {
				priority.unshift(CreepManager.action.storing);
			}
			priority.unshift(CreepManager.action.bulldozing);
			return priority;
		}
	};
	nextAction = creep => {
		if (
			creep.data.creepType == 'worker' &&
			creep.pos.roomName != creep.data.homeRoom &&
			Game.rooms[creep.data.homeRoom] &&
			Game.rooms[creep.data.homeRoom].controller
		) {
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
		return this.nextEnergyAction(creep);
	};
}

export default new WorkerBehaviour();
