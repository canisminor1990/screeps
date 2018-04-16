import { CreepSetup } from '../../class';

class MinerSetup extends CreepSetup {
	constructor() {
		super('miner');
		this.minControllerLevel = 1;
	}
	get default() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 1,
				[WORK]: 4,
			},
			multiBody: [WORK, MOVE],
			minAbsEnergyAvailable: 500,
			minEnergyAvailable: 0.3,
			maxMulti: 2,
			maxCount: room => room.sources.length,
		};
	}
	get low() {
		return {
			fixedBody: [WORK, WORK, MOVE],
			multiBody: [WORK],
			minAbsEnergyAvailable: 250,
			minEnergyAvailable: 0.9,
			maxMulti: 3,
			maxCount: room => room.sources.length,
		};
	}
	get high() {
		return {
			fixedBody: {
				[CARRY]: 1,
				[MOVE]: 1,
				[WORK]: 4,
			},
			multiBody: [WORK, MOVE],
			minAbsEnergyAvailable: 500,
			minEnergyAvailable: 0.1,
			maxMulti: 2,
			maxCount: room => room.sources.length,
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
			8: this.high,
		};
	}
}

export default new MinerSetup();
