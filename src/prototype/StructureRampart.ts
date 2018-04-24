class StructureRampartExtend extends StructureRampart {
	constructor() {}

	get active(): boolean {
		return this.room.RCL > 1;
	}

	get isCriticallyFortifyable(): boolean {
		return this.hits <= MIN_FORTIFY_LIMIT[this.room.RCL];
	}
}

Util.define(StructureRampart, StructureRampartExtend);
