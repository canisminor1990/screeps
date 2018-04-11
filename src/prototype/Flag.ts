Object.defineProperties(Flag.prototype, {
	cloaking: {
		get() {
			return this.memory.cloaking || '0';
		},
		set(value) {
			this.memory.cloaking = value;
		},
	},
	compare: {
		value(flagA, flagB) {
			return flagA.color === flagB.color && flagA.secondaryColor === flagB.secondaryColor;
		},
	},
	compareTo: {
		value(flag) {
			return Flag.compare(this, flag);
		},
	},
});
