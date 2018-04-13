import {CreepSetup} from "../../class";

class HaulerSetup extends CreepSetup {
	constructor() {
		super('hauler')
		this.minControllerLevel = 2;
	}

	get default() {
		return {
			fixedBody: [WORK, CARRY, MOVE],
			multiBody: [CARRY, CARRY, MOVE],
			minAbsEnergyAvailable: 200,
			minEnergyAvailable: 0.4,
			maxMulti: room => this.maxMulti(room),
			maxCount: room => this.maxCount(room),
			maxWeight: room => this.maxWeight(room),
		}
	}

	get high() {
		return {
			fixedBody: [WORK, CARRY, MOVE],
			multiBody: [CARRY, CARRY, MOVE],
			minAbsEnergyAvailable: 200,
			minEnergyAvailable: 0.1,
			maxMulti: room => this.maxMulti(room),
			maxCount: room => this.maxCount(room),
			maxWeight: room => this.maxWeight(room),
		}
	}

	get RCL() {
		return {
			1: this.none,
			2: this.none,
			3: this.default,
			4: this.default,
			5: this.default,
			6: this.default,
			7: this.default,
			8: this.high,
		};
	}

	maxMulti = (room) => {
		let max = 7;
		if (room.minerals.length > 0) max += 2;
		let contSum = _.sum(room.structures.container.in, 'sum');
		contSum += _.sum(room.droppedResources, 'amount');
		max += Math.floor(contSum / 1000);
		max += Creep.setup.upgrader._maxMulti(room);
		return Math.min(max, 16);
	};
	maxCount = (room) => {
		if (!room.population) return 0;
		let count = 0;
		let miners = room.population.typeCount.miner || 0;
		let workers = room.population.typeCount.worker || 0;
		let mineralMiners = room.population.typeCount.mineralMiner || 0;
		let cont = room.structures.container.in.length + room.structures.links.storage.length;
		if (miners > 0 || (cont > 0 && workers > Creep.setup.worker._maxCount(room))) {
			if (!room.storage || room.storage.id !== room.controller.memory.storage)
				count += Math.round(Creep.setup.upgrader._maxCount(room) / 2);
			if (
					room.structures.links.all.length < 3 ||
					(room.storage &&
							room.storage.active &&
							room.storage.charge > 1 &&
							room.structures.container.controller &&
							_.sum(room.structures.container.controller, 'store.energy') == 0)
			)
				count++;
			// add one when mineral miner active

			if (mineralMiners > 0) count++;

			/* Add hauler when there is energy on the ground */
			let dropped = 0;
			let isSource = pos => room.sources.some(s => s.pos.x === pos.x && s.pos.y === pos.y);
			let countNearSource = resource => {
				if (resource.resourceType === RESOURCE_ENERGY) {
					if (resource.pos.adjacent.some(isSource)) dropped += resource.amount;
				}
			};
			room.droppedResources.forEach(countNearSource);
			// if( room.storage && room.storage.active && dropped > 1000 ) count++;
			if (count === 0) count = 1;
		}
		return count;
	};
	maxWeight = (room) => {
		return this._maxCount(room) * 2000;
	};

}

export default new HaulerSetup;
