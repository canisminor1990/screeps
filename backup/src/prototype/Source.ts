// Source
// ///////////////////

Object.defineProperties(Source.prototype, {
	memory: {
		get(): any {
			if (_.isUndefined(Memory.sources)) {
				Memory.sources = {};
			}
			if (!_.isObject(Memory.sources)) {
				return undefined;
			}
			return (Memory.sources[this.id] = Memory.sources[this.id] || {});
		},
		set(value: any) {
			if (_.isUndefined(Memory.sources)) {
				Memory.sources = {};
			}
			if (!_.isObject(Memory.sources)) {
				throw new Error('Could not set memory extension for sources');
			}
			Memory.sources[this.id] = value;
		},
	},
	container: {
		get(): StructureContainer | null {
			if (_.isUndefined(this.memory.container)) {
				this.room.saveContainers();
			}
			if (_.isUndefined(this._container)) {
				if (this.memory.storage) {
					this._container = Game.getObjectById(this.memory.storage);
					if (!this._container) delete this.memory.storage;
				} else if (this.memory.terminal) {
					this._container = Game.getObjectById(this.memory.terminal);
					if (!this._container) delete this.memory.terminal;
				} else if (this.memory.container) {
					this._container = Game.getObjectById(this.memory.container);
					if (!this._container) delete this.memory.container;
				} else this._container = null;
			}
			return this._container;
		},
	},
	link: {
		get(): StructureLink | null {
			if (_.isUndefined(this._link)) {
				if (this.memory.link) {
					this._link = Game.getObjectById(this.memory.link);
					if (!this._link) delete this.memory.link;
				} else this._link = null;
			}
			return this._link;
		},
	},
});

// Mineral
// ///////////////////

Object.defineProperties(Mineral.prototype, {
	memory: {
		get(): any {
			if (_.isUndefined(Memory.minerals)) {
				Memory.minerals = {};
			}
			if (!_.isObject(Memory.minerals)) {
				return undefined;
			}
			return (Memory.minerals[this.id] = Memory.minerals[this.id] || {});
		},
		set(value: any) {
			if (_.isUndefined(Memory.minerals)) {
				Memory.minerals = {};
			}
			if (!_.isObject(Memory.minerals)) {
				throw new Error('Could not set memory extension for minerals');
			}
			Memory.minerals[this.id] = value;
		},
	},
	container: {
		get(): StructureContainer | null {
			if (_.isUndefined(this.memory.container)) {
				this.room.saveContainers();
			}
			if (_.isUndefined(this._container)) {
				if (this.memory.terminal) {
					this._container = Game.getObjectById(this.memory.terminal);
					if (!this._container) delete this.memory.terminal;
				} else if (this.memory.storage) {
					this._container = Game.getObjectById(this.memory.storage);
					if (!this._container) delete this.memory.storage;
				} else if (this.memory.container) {
					this._container = Game.getObjectById(this.memory.container);
					if (!this._container) delete this.memory.container;
				} else this._container = null;
			}
			return this._container;
		},
	},
});
