Object.defineProperties(Flag.prototype, {
	print: {
		get(): string {
			return Util.makeFlagUrl(this.name);
		},
	},
	cloaking: {
		get() {
			return this.memory.cloaking || '0';
		},
		set(value) {
			this.memory.cloaking = value;
		},
	},
	compareTo: {
		value(flag) {
			return Flag.compare(this, flag);
		},
	},
});
