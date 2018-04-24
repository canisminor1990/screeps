import { CreepBehaviour } from '../Behaviour';

class HaulerBehaviour extends CreepBehaviour {
	constructor() {
		super('hauler');
		this.setState({
			picking: {
				name: `picking-${this.name}`,
				energyOnly: false,
			},
		});
	}

	inflowActions = creep => {
		return [
			CreepManager.action.uncharging,
			CreepManager.action.picking,
			CreepManager.action.withdrawing,
			CreepManager.action.reallocating,
		];
	};
	outflowActions = creep => {
		let priority = [
			CreepManager.action.feeding,
			CreepManager.action.charging,
			CreepManager.action.fueling,
			CreepManager.action.storing,
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
		if (
			creep.pos.roomName != creep.data.homeRoom &&
			Game.rooms[creep.data.homeRoom] &&
			Game.rooms[creep.data.homeRoom].controller
		) {
			return CreepManager.action.travelling.assignRoom(creep, creep.data.homeRoom);
		}
		return this.nextEnergyAction(creep);
	};
}

export default new HaulerBehaviour();
