import { CreepBehaviour } from '../../class';

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
		return [Creep.action.uncharging, Creep.action.picking, Creep.action.withdrawing, Creep.action.reallocating];
	};
	outflowActions = creep => {
		let priority = [Creep.action.feeding, Creep.action.charging, Creep.action.fueling, Creep.action.storing];
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
		if (
			creep.pos.roomName != creep.data.homeRoom &&
			Game.rooms[creep.data.homeRoom] &&
			Game.rooms[creep.data.homeRoom].controller
		) {
			return Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
		}
		return this.nextEnergyAction(creep);
	};
}

export default new HaulerBehaviour();
