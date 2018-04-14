import { CreepSetup } from '../../class';

class UpgraderSetup extends CreepSetup {
	constructor() {
		super('upgrader');
		this.minControllerLevel = 2;
	}

	get default() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 1,
				[WORK]: 2,
			},
			multiBody: {
				[MOVE]: 1,
				[WORK]: 3,
			},
			minAbsEnergyAvailable: 400,
			minEnergyAvailable: 0.5,
			maxMulti: room => this.maxMulti(room),
			maxCount: room => this.maxCount(room),
		};
	}

	get low() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 1,
				[WORK]: 2,
			},
			multiBody: {
				[MOVE]: 1,
				[WORK]: 2,
			},
			minAbsEnergyAvailable: 300,
			minEnergyAvailable: 1,
			maxMulti: room => this.maxMulti(room),
			maxCount: room => this.maxCount(room),
		};
	}

	get level8() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 3,
			},
			multiBody: [WORK],
			minAbsEnergyAvailable: 1700,
			minEnergyAvailable: 0.5,
			maxMulti: CONTROLLER_MAX_UPGRADE_PER_TICK / UPGRADE_CONTROLLER_POWER,
			maxCount: room => this.maxCount(room),
		};
	}

	get RCL() {
		return {
			1: this.none,
			2: this.low,
			3: this.default,
			4: this.default,
			5: this.default,
			6: this.default,
			7: this.default,
			8: this.level8,
		};
	}

	maxMulti = room => {
		let multi = 0;
		const charge = room.storage && room.storage.active ? room.storage.charge : 0;
		if (!room.storage || (room.storage.active && charge > 0)) multi++;
		if (!room.storage || (room.storage.active && charge > 0.5)) multi++;
		if (room.storage && room.storage.active && charge >= 1) {
			let surplus = room.storage.store.energy - MAX_STORAGE_ENERGY[room.controller.level];
			multi += Math.ceil(surplus / 20000); // one more multi for each 20k surplus (+1)
		}
		return Math.min(11, multi);
	};
	maxCount = room => {
		const add = _.get(room, ['memory', 'addUpgrader'], 0);
		// Don't spawn upgrader if...
		if (
			// Room under attack
			room.situation.invasion ||
			// Energy reserves are low
			room.conserveForDefense ||
			// No energy structures built near controller
			room.structures.container.controller.length + room.structures.links.controller.length === 0 ||
			// Upgrading blocked -> http://support.screeps.com/hc/en-us/articles/207711889-StructureController#upgradeBlocked
			room.controller.upgradeBlocked ||
			// don't spawn a new upgrader while there are construction sites (and no storage)
			(room.myConstructionSites.length > 0 && !room.storage)
		)
			return 0;
		if (room.controller.level == 8) return 1;
		// if there is no energy for the upgrader return 0
		let upgraderEnergy = 0;
		let sumCont = cont => (upgraderEnergy += cont.store.energy);
		room.structures.container.controller.forEach(sumCont);
		let sumLink = link => (upgraderEnergy += link.energy);
		room.structures.links.controller.forEach(sumLink);
		if (upgraderEnergy === 0) return 0;
		if (room.storage && room.storage.active) {
			return (
				add + Math.max(1, Math.floor((room.storage.store.energy - MAX_STORAGE_ENERGY[room.controller.level]) / 350000))
			);
		}
		// if energy on the ground next to source > 700 return 3
		if (room.droppedResources) {
			let dropped = 0;
			let isSource = pos => room.sources.some(s => s.pos.x === pos.x && s.pos.y === pos.y);
			let countNearSource = resource => {
				if (resource.resourceType === RESOURCE_ENERGY) {
					if (resource.pos.adjacent.some(isSource)) dropped += resource.amount;
				}
			};
			room.droppedResources.forEach(countNearSource);
			// if(dropped > 700) return add + 3;
		}
		return add + 2;
	};
}

export default new UpgraderSetup();
