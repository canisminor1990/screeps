Object.defineProperties(StructureController.prototype, {
	memory: {
		get(): any {
			if (_.isUndefined(Memory.controllers)) {
				Memory.controllers = {};
			}
			if (!_.isObject(Memory.controllers)) {
				return undefined;
			}
			return (Memory.controllers[this.id] = Memory.controllers[this.id] || {});
		},
		set(value: any) {
			if (_.isUndefined(Memory.controllers)) {
				Memory.controllers = {};
			}
			if (!_.isObject(Memory.controllers)) {
				throw new Error('Could not set memory extension for controller');
			}
			Memory.controllers[this.id] = value;
		},
	},
});
