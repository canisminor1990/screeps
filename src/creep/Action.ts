export class CreepAction {
	// action name
	name: string;

	constructor(actionName: string) {
		this.name = actionName;
	}

	// max allowed creeps per target
	maxPerTarget = Infinity;
	// max allowed creeps per action (and room)
	maxPerAction = Infinity;
	// range within which the action can be rund (e.g. upgrade controller = 3)
	targetRange = 1;
	// range until which the target has been reached. (e.g. can be less than targetRange)
	reachedRange = 1;
	// if true, will try to find new target if a target has become invalid
	// if false, an invalid target wil invalidate the action as well (causing to get a new action)
	renewTarget = true;
	// get unique identifier of any object (id or name)
	// empty default strategy
	default = {
		name: `default-${this.name}`,
		moveOptions: options => {
			return options || {};
		},
	};
	setDefault = (value: obj): void => {
		_.assign(this.default, value);
	};
	getTargetId = target => {
		return target.id || target.name;
	};
	// get an object by its unique identifier (id or name)
	getTargetById = id => {
		return Game.getObjectById(id) || Game.spawns[id] || Game.flags[id];
	};
	// determines, if an action is (still) valid. Gets validated each tick.
	// check possible override in derived action
	isValidAction = creep => {
		return true;
	};
	// determines, if a target is (still) valid. Gets validated each tick.
	// check possible override in derived action
	isValidTarget = (target, creep) => {
		return target != null;
	};
	// determines, if an action is valid. Gets validated only once upon assignment.
	// check possible override in derived action
	isAddableAction = creep => {
		return (
			this.maxPerAction === Infinity ||
			!creep.room.population ||
			!creep.room.population.actionCount[this.name] ||
			creep.room.population.actionCount[this.name] < this.maxPerAction
		);
	};
	// determines, if a target is valid. Gets validated only once upon assignment.
	// check possible override in derived action
	isAddableTarget = (target, creep) => {
		// target is valid to be given to an additional creep
		return (
			!target.targetOf ||
			this.maxPerTarget === Infinity ||
			_.filter(target.targetOf, { actionName: this.name }).length < this.maxPerTarget
		);
	};
	// find a new target for that action
	// needs implementation in derived action
	newTarget = creep => {
		return null;
	};
	unassign = creep => {
		delete creep.data.actionName;
		delete creep.data.targetId;
		delete creep.action;
		delete creep.target;
	};
	// order for the creep to run each tick, when assigned to that action
	step = creep => {
		if (CHATTY) creep.say(this.name, SAY_PUBLIC);
		let range = creep.pos.getRangeTo(creep.target);
		if (range <= this.targetRange) {
			let workResult = this.work(creep);
			if (workResult != OK) {
				creep.handleError({
					errorCode: workResult,
					action: this,
					target: creep.target,
					range,
					creep,
				});
				return this.unassign(creep);
			}
			range = creep.pos.getRangeTo(creep.target); // target may have changed (eg. hauler feed+move/tick)
		}
		if (creep.target && creep.hasActiveBodyparts(MOVE)) {
			if (range > this.targetRange) creep.travelTo(creep.target, { range: this.targetRange });
			else if (range > this.reachedRange) {
				// low CPU pathfinding for last few steps.
				const direction = creep.pos.getDirectionTo(creep.target);
				const targetPos = Traveler.positionAtDirection(creep.pos, direction);
				if (creep.room.isWalkable(targetPos.x, targetPos.y)) {
					// low cost last steps if possible
					creep.move(direction);
				} else if (!creep.pos.isNearTo(creep.target)) {
					// travel there if we're not already adjacent
					creep.travelTo(creep.target, { range: this.reachedRange });
				}
			}
		}
	};
	// order for the creep to run when at target
	work = creep => {
		return ERR_INVALID_ARGS;
	};
	// validate, if this action is still valid for a certain creep and target
	// returns the target (could be a ne one) if valid or null
	validateActionTarget = (creep, target) => {
		if (this.isValidAction(creep)) {
			// validate target or new
			if (!this.isValidTarget(target, creep)) {
				if (this.renewTarget) {
					// invalid. try to find a new one...
					delete creep.data.path;
					return this.newTarget(creep);
				}
			} else return target;
		}
		return null;
	};
	// assign the action to a creep
	// optionally predefine a fixed target
	assign = (creep, target) => {
		if (target === undefined) target = this.newTarget(creep);
		if (target && this.isAddableTarget(target, creep)) {
			if (LOG_TRACE)
				Log.trace('Action', {
					creepName: creep.name,
					assign: this.name,
					target: !target || target.name || target.id,
					Action: 'assign',
				});
			if (
				!creep.action ||
				creep.action.name != this.name ||
				!creep.target ||
				creep.target.id !== target.id ||
				creep.target.name != target.name
			) {
				PopManager.registerAction(creep, this, target);
				this.onAssignment(creep, target);
			}
			return true;
		}
		return false;
	};
	showAssignment = (creep, target) => {
		if (SAY_ASSIGNMENT && ACTION_SAY[this.name.toUpperCase()])
			creep.say(ACTION_SAY[this.name.toUpperCase()], SAY_PUBLIC);
		if (target instanceof RoomObject || (target instanceof RoomPosition && VISUALS.ACTION_ASSIGNMENT)) {
			Visuals.drawArrow(creep, target);
		}
	};
	// assignment postprocessing
	onAssignment = (creep, target) => {
		this.showAssignment(creep, target);
	};
	// strategy accessor
	selectstate = () => {
		return [this.default];
	};
	// get member with this action's name
	isMember = collection => {
		return _.find(
			collection,
			a => {
				return a.name === this.name;
			},
			this,
		);
	};
	getStrategy = (strategyName, creep, ...args) => {
		if (_.isUndefined(args)) return creep.getStrategyHandler([this.name], strategyName);
		else return creep.getStrategyHandler([this.name], strategyName, ...args);
	};
}
