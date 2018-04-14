Object.defineProperties(Flag.prototype, {
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
