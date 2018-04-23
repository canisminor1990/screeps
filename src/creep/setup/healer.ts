import { CreepSetup } from '../Setup';

class HealerSetup extends CreepSetup {
	constructor() {
		super('healer');
		this.minControllerLevel = 7;
		this.globalMeasurement = true;
	}

	get RCL() {
		return {
			1: this.none,
			2: this.none,
			3: this.none,
			4: this.none,
			5: this.none,
			6: this.none,
			7: {
				fixedBody: [],
				multiBody: [MOVE, HEAL],
				minAbsEnergyAvailable: 300,
				minEnergyAvailable: 0.8,
				maxMulti: 4,
				maxCount: 0,
				maxWeight: 0,
			},
			8: {
				fixedBody: [],
				multiBody: [MOVE, HEAL],
				minAbsEnergyAvailable: 300,
				minEnergyAvailable: 0.8,
				maxMulti: 4,
				maxCount: 0,
				maxWeight: 0,
			},
		};
	}
}

export default new HealerSetup();
