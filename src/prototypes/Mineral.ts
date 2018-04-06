Object.defineProperties(Mineral.prototype, {
	memory: {
		get(): any {
			this._checkMemory();
			return Memory.minerals[this.id];
		},
		set(value: any): void {
			this._checkMemory();
			Memory.minerals[this.id] = value;
		},
		active: {
			get(): boolean {
				return this.pos.structures.length > 0 && this.mineralAmount > 0;
			},
		},
		container: {
			get(): StructureContainer | null {
				if (!_.isUndefined(this.memory.container)) {
					const cacheContainer: StructureContainer | null = Game.getObjectById(this.memory.container);
					if (cacheContainer !== null) return cacheContainer;
					delete this.memory.container;
				}
				// 重新寻找
				let container: any;
				_.forEach(this.pos.getAdjacentPos(1), (pos: RoomPosition) => {
					if (!_.isUndefined(container)) return;
					let c = pos.getStructure(STRUCTURE_CONTAINER);
					if (!_.isUndefined(c)) container = c as StructureContainer;
				});
				if (_.isUndefined(container)) return null;
				this.memory.container = container.id;
				return container;
			},
		},
		hasContainer: {
			get(): boolean {
				return this.container !== null;
			},
		},
	},
});

Mineral.prototype._checkMemory = function(): void {
	if (_.isUndefined(Memory.minerals)) Memory.minerals = {};
	if (_.isUndefined(_.get(Memory.minerals, this.id))) _.set(Memory.minerals, this.id, {});
};
