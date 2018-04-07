Object.defineProperties(RoomObject.prototype, {
	targetOf: {
		get(): number {
			return _.filter(Memory.creeps, (c: CreepMemory) => c.target === this.id).length;
		},
	},
});
