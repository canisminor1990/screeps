export class CreepSetup {
	type: string;

	constructor(typeName) {
		this.type = typeName;
	}

	minControllerLevel = 0;
	none = {
		fixedBody: [],
		multiBody: [],
		minAbsEnergyAvailable: Infinity,
		minEnergyAvailable: 1,
		maxMulti: 0,
		maxCount: 0,
		maxWeight: 0,
	};

	abstract get RCL() {
		return {
			1: this.none,
			2: this.none,
			3: this.none,
			4: this.none,
			5: this.none,
			6: this.none,
			7: this.none,
			8: this.none,
		};
	}

	globalMeasurement = false;
	measureByHome = false;
	sortedParts = true;
	mixMoveParts = false;

	_fixedBody = room => this.getRCL(room, 'fixedBody');
	_multiBody = room => this.getRCL(room, 'multiBody');
	_minAbsEnergyAvailable = room => this.getRCL(room, 'minAbsEnergyAvailable');
	_minEnergyAvailable = room => this.getRCL(room, 'minEnergyAvailable');
	_minMulti = room => this.getRCL(room, 'minMulti');
	_maxMulti = room => this.getRCL(room, 'maxMulti');
	_maxCount = room => this.getRCL(room, 'maxCount');
	_maxWeight = room => this.getRCL(room, 'maxWeight');

	buildParams = spawn => {
		let memory = {
			setup: null,
			name: null,
			parts: [],
			cost: 0,
			mother: null,
			home: null,
			breeding: 1,
		};
		memory.setup = this.type;
		memory.parts = this.parts(spawn.room);
		memory.cost = Creep.bodyCosts(memory.parts);
		memory.mother = spawn.name;
		memory.home = spawn.pos.roomName;
		for (let son = 1; memory.name == null || Game.creeps[memory.name] || Memory.population[memory.name]; son++) {
			memory.name = this.type + '-' + memory.cost + '-' + son;
		}
		return memory;
	};
	isValidSetup = room => {
		if (room.controller.level < this.minControllerLevel) {
			if (DEBUG && TRACE)
				Util.trace(
					'Setup',
					{ setupType: this.type, room: room.name, rcl: room.controller.level, Setup: 'isValidSetup' },
					'low RCL',
				);
			return false;
		}

		let minAbsEnergyAvailable = this._minAbsEnergyAvailable(room);
		let minEnergyAvailable = this._minEnergyAvailable(room);
		const absEnergy = room.remainingEnergyAvailable;
		const energy = room.relativeRemainingEnergyAvailable;
		if (absEnergy < minAbsEnergyAvailable || energy < minEnergyAvailable) {
			if (DEBUG && TRACE)
				Util.trace(
					'Setup',
					{ setupType: this.type, room: room.name, absEnergy, energy, Setup: 'isValidSetup' },
					'not enough energy',
				);
			return false;
		}

		let maxCount = this._maxCount(room);
		let maxWeight = this._maxWeight(room);
		if (maxCount === 0 || maxWeight === 0) {
			if (DEBUG && TRACE)
				Util.trace(
					'Setup',
					{ setupType: this.type, room: room.name, maxCount, maxWeight, Setup: 'isValidSetup' },
					'too many creeps',
				);
			return false;
		}
		if (maxCount == null) maxCount = Infinity;
		if (maxWeight == null) maxWeight = Infinity;

		let existingCount = 0;
		let existingWeight = 0;
		if (this.measureByHome) {
			let home = room.name;
			let count = entry => {
				if (entry.creepType == this.type && entry.homeRoom == home && Creep.isWorkingAge(entry)) {
					existingCount++;
					existingWeight += entry.weight;
				}
			};
			_.forEach(Memory.population, count);
		} else {
			let population = this.globalMeasurement ? Population : room.population;
			if (!population || !population.typeCount[this.type]) return true;
			existingCount = population.typeCount[this.type] || 0;
			existingWeight = population.typeWeight[this.type] || 0;
		}
		const returnVal = existingCount < maxCount && existingWeight < maxWeight;
		if (DEBUG && TRACE)
			Util.trace(
				'Setup',
				{ setupType: this.type, room: room.name, returnVal, Setup: 'isValidSetup' },
				'count:',
				existingCount,
				'<',
				maxCount,
				'weight:',
				existingWeight,
				'<',
				maxWeight,
			);
		return returnVal;
	};
	existingWeight = room => {
		let existingWeight = 0;
		if (this.measureByHome) {
			let home = room.name;
			let count = entry => {
				if (entry.creepType == this.type && entry.homeRoom == home) {
					existingWeight += entry.weight;
				}
			};
			_.forEach(Memory.population, count);
		} else {
			let population = this.globalMeasurement ? Population : room.population;
			existingWeight = population ? population.typeWeight[this.type] || 0 : 0;
		}
		return existingWeight;
	};
	parts = room => {
		const fixedBody = this._fixedBody(room);
		const multiBody = this._multiBody(room);
		const minMulti = this._minMulti(room);
		const maxMulti = this._maxMulti(room);
		const maxWeight = this._maxWeight(room);
		let maxCreepWeight;
		if (maxWeight) {
			const existingWeight = this.existingWeight(room);
			maxCreepWeight = maxWeight - existingWeight;
		}
		if (DEBUG && TRACE)
			Util.trace('Setup', {
				setupType: this.type,
				room: room.name,
				Setup: 'parts',
				maxWeight,
				minMulti,
				maxMulti,
			});
		return Creep.compileBody(room, {
			fixedBody,
			multiBody,
			minMulti,
			maxMulti,
			maxWeight: maxCreepWeight,
			currentEnergy: true,
			sort: this.sortedParts,
		});
	};
	mixParts = parts => {
		let sum = _.countBy(parts);
		let nonMove = parts.filter(part => part != MOVE);
		let mix = [];
		for (let iNonMove = nonMove.length - 1; iNonMove >= 0; iNonMove--) {
			if (sum[MOVE]-- > 0) {
				mix.unshift(MOVE);
			}
			mix.unshift(nonMove[iNonMove]);
		}
		while (sum[MOVE] > 0) {
			mix.unshift(MOVE);
			sum[MOVE]--;
		}
		return mix;
	};
	maxCost = room => {
		return Creep.bodyCosts(this._multiBody(room)) * this._maxMulti(room) + Creep.bodyCosts(this._fixedBody(room));
	};
	maxPerFlag = (flagFilter, maxRoomRange, measureByHome) => {
		if (!flagFilter) {
			throw new Error('undefined flagFilter');
		}
		return room => {
			let max = 0;
			let distance, flag;
			let calcMax = flagEntry => {
				distance = Util.routeRange(room.name, flagEntry.roomName);
				if (distance > maxRoomRange) {
					return;
				}
				// for each flag in range
				flag = Game.flags[flagEntry.name];
				// if someone is dying then allow 2 per flag
				if (
					_.chain(flag.targetOf)
						.filter(c => {
							return !measureByHome || c.homeRoom === room.name;
						})
						.every(Creep.isWorkingAge)
						.value()
				) {
					max++;
				} else {
					max = max + 2;
				}
			};
			let flagEntries = Flag.filter(flagFilter);
			flagEntries.forEach(calcMax);
			return max;
		};
	};

	getRCL = (room, property) => {
		const prop = this.RCL[room.controller.level][property];
		if (_.isFunction(prop)) {
			// console.log(this.type, room.controller.level, property, prop(room))
			return prop(room);
		}
		// console.log(this.type, room.controller.level, property, prop)
		return prop;
	};
}
