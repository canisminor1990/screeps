class FlagExtend extends Flag {
	constructor() {}

	get print(): string {
		return Util.makeFlagUrl(this.name);
	}

	get cloaking(): number {
		return this.memory.cloaking || 0;
	}

	set cloaking(value: number) {
		this.memory.cloaking = value;
	}

	compareTo(flag: Flag): boolean {
		return Flag.compare(this, flag);
	}
}

Util.define(Flag, FlagExtend);
