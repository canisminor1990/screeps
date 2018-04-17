Object.defineProperties(StructureWall.prototype, {
	active: {
		get(): boolean {
			return this.room.RCL > 1;
		},
	},
	isCriticallyFortifyable: {
		get(): boolean {
			return this.hits <= MIN_FORTIFY_LIMIT[this.room.RCL];
		},
	},
});
