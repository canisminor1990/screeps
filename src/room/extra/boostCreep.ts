import { RoomExtra } from '../Extra';

class BoostCreepExtra extends RoomExtra {
	constructor() {
		super('boostCreepExtra');
	}

	analyzeRoom = (room: Room) => {
		const boostCreep = room.memory.boostCreep;
		if (boostCreep) {
			const lab = Game.getObjectById(boostCreep.id);
			if (_.isNull(lab)) return Log.error('Wrong lab id');
			if (lab.mineralAmount < lab.mineralCapacity / 2 && room.storage && room.terminal) {
				const storage = room.storage.store[boostCreep.mineralType] || 0;
				const terminal = room.terminal.store[boostCreep.mineralType] || 0;
				const sum = storage + terminal;
				if (room.memory.resources.orders.length === 0 && sum < 3000)
					return room.placeRoomOrder(room.storage.id, boostCreep.mineralType, 3000);
			}
			if (lab.mineralType !== boostCreep.mineralType) return (boostCreep.ready = false);
			if (lab.mineralAmount > lab.mineralCapacity / 3 && lab.energy > lab.energyCapacity / 3)
				return (boostCreep.ready = true);
		}
	};

	prototypeExtend = () => {
		this.assignRoomPrototype({
			setBoost: {
				value(id: string, mineralType: string, creepType: string): void {
					const lab = Game.getObjectById(id);
					if (_.isNull(lab) || !(lab instanceof StructureLab)) return Log.error('Wrong lab id');
					Util.resetBoostProduction(this.name);
					this.memory.boostCreep = {
						id,
						mineralType,
						creepType,
						ready: false,
					};
					this.placeOrder(id, mineralType, lab.mineralCapacity);
					Log.room(
						this.name,
						Util.emoji.boosting,
						Dye(COLOR_GREEN, `boosting set success: ${mineralType} => ${creepType}`),
					);
				},
			},
		});
	};
}

export default new BoostCreepExtra();
