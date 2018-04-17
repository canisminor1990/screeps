Object.defineProperties(Flag.prototype, {
	print: {
		get(): string {
			return Util.makeFlagUrl(this.name);
		},
	},
	cloaking: {
		get(): number {
			return this.memory.cloaking || 0;
		},
		set(value: number) {
			this.memory.cloaking = value;
		},
	},
	compareTo: {
		value(flag: Flag): boolean {
			return Flag.compare(this, flag);
		},
	},
});
