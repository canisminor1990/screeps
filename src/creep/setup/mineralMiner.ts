import { CreepSetup } from '../Setup';

class MineralMinerSetup extends CreepSetup {
	constructor() {
		super('mineralMiner');
		this.minControllerLevel = 6;
	}

	get default() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 1,
				[WORK]: 3,
			},
			multiBody: {
				[MOVE]: 1,
				[WORK]: 3,
			},
			minAbsEnergyAvailable: 750,
			minEnergyAvailable: 0.3,
			maxMulti: 11,
			minMulti: 1,
			maxCount: room => this.maxCount(room),
		};
	}

	get RCL() {
		return {
			1: this.none,
			2: this.none,
			3: this.none,
			4: this.none,
			5: this.none,
			6: this.default,
			7: this.default,
			8: this.default,
		};
	}

	maxCount = room => {
		if (room.memory.noMineralMiners) return 0;
		let max = 0;
		let haulers = room.population.typeCount.hauler || 0;
		if (haulers === 0) return 0;
		if (room.storage && room.storage.sum < room.storage.storeCapacity * 0.9) {
			let add = mineral => {
				if (mineral.mineralAmount > 0) max++;
			};
			room.minerals.forEach(add);
		}
		return max;
	};
}

export default new MineralMinerSetup();
