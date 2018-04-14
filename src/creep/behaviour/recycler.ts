import { CreepBehaviour } from '../../class';

class RecyclerBehaviour extends CreepBehaviour {
	constructor() {
		super('recycler');
		this._invalidAction = this.invalidAction;
		this.setState({
			recycling: {
				name: `recycling-${this.name}`,
				isValidAction: creep => {
					return !creep.sum; // only recycle when empty
				},
			},
			uncharging: {
				name: `uncharging-${this.name}`,
				isValidAction: creep => {
					return (
						(creep.data.travelRoom && // only gather when on mission
							creep.sum < creep.carryCapacity) ||
						false
					);
				},
			},
			withdrawing: {
				name: `withdrawing-${this.name}`,
				isValidAction: creep => {
					return (
						(creep.data.travelRoom && // only gather when on mission
							creep.room.storage &&
							creep.room.storage.store.energy > 0 &&
							creep.sum < creep.carryCapacity) ||
						false
					);
				},
			},
			travelling: {
				name: `travelling-${this.name}`,
				newTarget: creep => {
					if (!creep.data.travelRoom) {
						if (creep.data.travelPos) {
							creep.data.travelRoom = creep.data.travelPos.roomName;
						} else if (creep.room.structures.spawns.length) {
							return null; // arrived
						} else {
							// TODO search for closest spawn
							creep.data.travelRoom = creep.data.homeRoom;
						}
					}
					const room = Game.rooms[creep.data.travelRoom];
					let target = room && (room.storage || room.structures.spawns[0]);
					if (!target) {
						// TODO create flag and place in room
						return creep;
					}
					return target;
				},
			},
		});
		this.invalidAction = creep => {
			if (this._invalidAction(creep) || !creep.action.isMember(this.actions())) {
				delete creep.data.targetId;
				delete creep.data.path;
				return true;
			}
			return false;
		};
	}
	actions = creep => {
		return [
			Creep.action.picking,
			Creep.action.withdrawing,
			Creep.action.uncharging,
			Creep.action.travelling,
			Creep.action.storing,
			Creep.action.feeding,
			Creep.action.dropping,
			Creep.action.recycling,
			Creep.action.idle,
		];
	};
}

export default new RecyclerBehaviour();
