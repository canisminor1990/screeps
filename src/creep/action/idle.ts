import { CreepAction } from '../Action';

class IdleAction extends CreepAction {
	constructor() {
		super('idle');
		this.setDefault({
			idleMove: creep => true,
		});
	}

	targetRange = 3;
	isValidAction = creep => {
		return true;
	};
	isAddableAction = creep => {
		return true;
	};
	isAddableTarget = target => {
		return true;
	};
	newTarget = creep => {
		return FlagManager.specialFlag();
	};
	step = creep => {
		if (CHATTY) creep.say(this.name, SAY_PUBLIC);
		if (creep.getStrategyHandler([this.name], 'idleMove', creep)) creep.idleMove();
		delete creep.data.actionName;
		delete creep.data.targetId;
	};
}

export default new IdleAction();
