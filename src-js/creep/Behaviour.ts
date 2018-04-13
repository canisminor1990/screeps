// base class for behaviours
const Behaviour = function(name) {
	this.name = name;
	this.actions = creep => []; // priority list of non resource based actions
	this.inflowActions = creep => []; // priority list of actions for getting resources
	this.outflowActions = creep => []; // priority list of actions for using resources
	this.assignAction = function(creep, action, target, debouncePriority) {
		if (typeof action === 'string') action = Creep.action[action];
		const valid = action.isValidAction(creep);
		if (DEBUG && TRACE)
			Util.trace('Action', {
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
		if (DEBUG && TRACE)
			Util.trace('Action', {
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
			if (DEBUG && TRACE)
				Util.trace('Behaviour', {
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
		} else if (DEBUG && TRACE) {
			Util.trace('Action', {
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
	this.selectInflowAction = function(creep) {
		const actionChecked = {};
		const outflowActions = this.outflowActions(creep);
		for (const action of this.inflowActions(creep)) {
			if (!actionChecked[action.name]) {
				actionChecked[action.name] = true;
				if (this.assignAction(creep, action, undefined, outflowActions)) return
			}
		}
		return Creep.action.idle.assign(creep);
	};
	this.selectAction = function(creep, actions) {
		const actionChecked = {};
		for (const action of actions) {
			if (!actionChecked[action.name]) {
				actionChecked[action.name] = true;
				if (this.assignAction(creep, action))return
			}
		}
		return Creep.action.idle.assign(creep);
	};
	this.nextAction = function(creep) {
		return this.selectAction(creep, this.actions(creep));
	};
	this.needEnergy = creep => creep.sum < creep.carryCapacity / 2;
	this.nextEnergyAction = function(creep) {
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
	this.invalidAction = function(creep) {
		return !creep.action;
	};
	this.run = function(creep) {
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
			if (DEBUG && TRACE)
				Util.trace('Behaviour', {
					actionName: creep.action.name,
					behaviourName: this.name,
					creepName: creep.name,
					target: creep.target.id || creep.target.name,
					Action: 'run',
				});
			creep.action.step(creep);
		} else {
			Util.logError('Creep without action/activity!\nCreep: ' + creep.name + '\ndata: ' + JSON.stringify(creep.data));
		}
	};
	this.assign = function(creep) {
		creep.data.creepType = this.name;
	};
	this.state = {
		default: {
			name: `default-${this.name}`,
		},
	};
	this.selectstate = function(actionName) {
		return [this.state.default, this.state[actionName]];
	};
};
module.exports = Behaviour;
