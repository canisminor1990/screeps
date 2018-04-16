export class CreepBehaviour {
	name: string;

	constructor(behaviourName: string) {
		this.name = behaviourName;
	}

	state = {
		default: {
			name: `default-${this.name}`,
		},
	};
	setState = (value: obj): void => {
		_.assign(this.state, value);
	};
	mergeState = (value: obj): void => {
		_.merge(this.state, value);
	};
	actions = creep => []; // priority list of non resource based actions
	inflowActions = creep => []; // priority list of actions for getting resources
	outflowActions = creep => []; // priority list of actions for using resources
	assignAction = (creep, action, target, debouncePriority) => {
		if (typeof action === 'string') action = Creep.action[action];
		const valid = action.isValidAction(creep);
		if (LOG_TRACE)
			Log.trace('Action', {
				actionName: action.name,
				behaviourName: this.name,
				creepName: creep.name,
				valid,
				Action: 'isValidAction',
			});
		if (!valid) {
			return false;
		}

		const addable = action.isAddableAction(creep);
		if (LOG_TRACE)
			Log.trace('Action', {
				actionName: action.name,
				behaviourName: this.name,
				creepName: creep.name,
				addable,
				Action: 'isAddableAction',
			});
		if (!addable) {
			return false;
		}

		const assigned = action.assignDebounce
			? action.assignDebounce(creep, debouncePriority, target)
			: action.assign(creep, target);
		if (assigned) {
			if (LOG_TRACE)
				Log.trace('Behaviour', {
					actionName: action.name,
					behaviourName: this.name,
					creepName: creep.name,
					assigned,
					Behaviour: 'nextAction',
					Action: 'assign',
					target: creep.target.id || creep.target.name,
				});
			creep.data.lastAction = action.name;
			creep.data.lastTarget = creep.target.id;
			return true;
		} else if (LOG_TRACE) {
			Log.trace('Action', {
				actionName: action.name,
				behaviourName: this.name,
				creepName: creep.name,
				assigned,
				Behaviour: 'assignAction',
				Action: 'assign',
			});
		}
		return false;
	};
	selectInflowAction = creep => {
		const actionChecked = {};
		const outflowActions = this.outflowActions(creep);
		for (let action of this.inflowActions(creep)) {
			if (!actionChecked[action.name]) {
				actionChecked[action.name] = true;
				if (this.assignAction(creep, action, undefined, outflowActions)) return;
			}
		}
		return Creep.action.idle.assign(creep);
	};
	selectAction = (creep, actions) => {
		const actionChecked = {};
		for (let action of actions) {
			if (!actionChecked[action.name]) {
				actionChecked[action.name] = true;
				if (this.assignAction(creep, action)) return;
			}
		}
		return Creep.action.idle.assign(creep);
	};
	nextAction = creep => {
		return this.selectAction(creep, this.actions(creep));
	};
	needEnergy = creep => creep.sum < creep.carryCapacity / 2;
	nextEnergyAction = creep => {
		if (this.needEnergy(creep)) {
			return this.selectInflowAction(creep);
		} else {
			if (creep.data.nextAction && creep.data.nextTarget) {
				const action = Creep.action[creep.data.nextAction];
				const target = Game.getObjectById(creep.data.nextTarget);
				delete creep.data.nextAction;
				delete creep.data.nextTarget;
				if (this.assignAction(creep, action, target)) {
					return true;
				}
			}
			return this.selectAction(creep, this.outflowActions(creep));
		}
	};
	invalidAction = creep => {
		return !creep.action;
	};
	run = creep => {
		// Assign next Action
		if (this.invalidAction(creep)) {
			if (
				creep.data.destiny &&
				creep.data.destiny.task &&
				Task[creep.data.destiny.task] &&
				Task[creep.data.destiny.task].nextAction
			) {
				Task[creep.data.destiny.task].nextAction(creep);
			} else {
				this.nextAction(creep);
			}
		}

		// Do some work
		if (creep.action && creep.target) {
			if (LOG_TRACE)
				Log.trace('Behaviour', {
					actionName: creep.action.name,
					behaviourName: this.name,
					creepName: creep.name,
					target: creep.target.id || creep.target.name,
					Action: 'run',
				});
			creep.action.step(creep);
		} else {
			Log.error('Creep without action/activity!\nCreep: ' + creep.name + '\ndata: ' + JSON.stringify(creep.data));
		}
	};
	assign = creep => {
		creep.data.creepType = this.name;
	};
	selectstate = actionName => {
		return [this.state.default, this.state[actionName]];
	};
}
