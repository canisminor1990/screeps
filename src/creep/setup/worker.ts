import { CreepSetup } from '../../class';

class WorkerSetup extends CreepSetup {
	constructor() {
		super('worker');
	}

	get default() {
		return {
			fixedBody: [],
			multiBody: {
				[CARRY]: 1,
				[WORK]: 1,
				[MOVE]: 1,
			},
			// minMulti: room => this.minMulti(room, 0, 200),
			minMulti: 1,
			maxMulti: room => this.maxMulti(room, 0, 200, _.size(this.default.multiBody)),
			maxWeight: 9600,
			maxCount: room => this.maxWorker(room),
			minEnergyAvailable: room => this.minEnergyAvailable(room),
		};
	}

	get low() {
		return {
			fixedBody: [],
			multiBody: {
				[CARRY]: 1,
				[WORK]: 1,
				[MOVE]: 2,
			},
			minMulti: 1,
			maxMulti: 8,
			maxWeight: room => (room.controller.level === 2 ? 14400 : 4000),
			maxCount: room => this.maxWorker(room),
			minEnergyAvailable: room => this.minEnergyAvailable(room),
		};
	}

	get RCL() {
		return {
			1: this.low,
			2: this.low,
			3: this.default,
			4: this.default,
			5: this.default,
			6: this.default,
			7: this.default,
			8: this.default,
		};
	}

	maxWorker = room => {
		let count = 0;
		if (room.structures.fortifyable.length > 0 || room.isCriticallyFortifyable) {
			count++;
			if (room.storage && room.storage.store.energy > 400000) count = count + 2;
		}
		// no hauler and no miner => 1
		// if there is a miner it should be no problem to spawn a hauler, and vice versa.
		// if none of them are present spawn a worker first
		if (room.controller.level < 4) {
			if (room.situation.invasion) return 1;
			let max = room.controller.level === 2 ? 3 * room.sources.length : 2 * room.sources.length;
			const numPioneers = (room.population && room.population.typeCount.pioneer) || 0;
			return max - numPioneers;
		}
		if (!this.hasMinerOrHauler(room)) count++;
		// constructionsites present & no strorage or storage > min
		if (
			room.myConstructionSites.length > 0 &&
			(!room.storage || !room.storage.active || (room.storage.store && room.storage.charge > 0)) &&
			count <= 1
		)
			count++;
		return count;
	};
	// validates if there is a miner or a hauler present
	hasMinerOrHauler = room => {
		if (!room.population) return false;
		return room.population.typeCount.hauler > 0 || room.population.typeCount.miner > 0;
	};
	// this assures that the first worker gets spawned immediately, but later workers require more energy, giving preference to miners
	byPopulation = (room, start, perBody, limit) => {
		let result = start;
		if (room.population) result += room.population.typeCount[this.type] * perBody;
		if (!limit || result <= limit) {
			return result;
		} else {
			return limit;
		}
	};
	minEnergyAvailable = room => {
		switch (room.controller.level) {
			case 1:
				return this.byPopulation(room, 0, 1, 1);
			case 2:
				return this.byPopulation(room, 0, 0.8, 1);
			case 3:
				return this.byPopulation(room, 0, 0.6, 1);
			case 4 || 5 || 6:
				return this.hasMinerOrHauler(room) ? 0.5 : 0;
			case 7:
				return this.hasMinerOrHauler(room) ? 0.2 : 1;
			default:
				return this.hasMinerOrHauler(room) ? 0.1 : 1;
		}
	};
	maxMulti = (room, fixedCost, multiCost, multiLength) => {
		return _.min([Math.floor((room.energyCapacityAvailable - fixedCost) / multiCost), Math.floor(50 / multiLength)]);
	};
}

export default new WorkerSetup();
