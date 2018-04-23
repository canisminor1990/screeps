import { CreepSetup } from '../Setup';

class PrivateerSetup extends CreepSetup {
	constructor() {
		super('privateer');
		this.minControllerLevel = 3;
		this.globalMeasurement = true;
		this.measureByHome = true;
	}
	get default() {
		return {
			fixedBody: [WORK, CARRY, MOVE],
			multiBody: [WORK, CARRY, MOVE],
			minAbsEnergyAvailable: 400,
			minEnergyAvailable: 0.8,
			maxMulti: 15,
			minMulti: room => room.RCL,
			maxWeight: room => room.privateerMaxWeight,
		};
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
			8: this.default,
		};
	}
}

export default new PrivateerSetup();
