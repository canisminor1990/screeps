import { RoleType } from '../enums/creep';
import { getCost, makeBodyArray } from '../utils';

export abstract class Setup {
	public name: RoleType;
	public room: Room;

	constructor(name: RoleType) {
		this.name = name;
	}

	public run(room: Room): RclSetup {
		this.room = room;
		return this.RCL[this.room.rcl];
	}

	abstract get RCL(): Rcl;

	public maxMulti(fixedBody: BodySetup, multiBody: BodySetup): number {
		const fixedCost = getCost(makeBodyArray(fixedBody)) as number;
		const multiCost = getCost(makeBodyArray(multiBody)) as number;
		return _.min([
			Math.floor((this.room.energyCapacityAvailable - fixedCost) / multiCost),
			Math.floor((50 / _.size(multiBody)) as number),
		]);
	}
}
