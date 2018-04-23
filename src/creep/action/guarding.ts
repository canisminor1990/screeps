import { CreepAction } from '../Action';

class GuardingAction extends CreepAction {
	constructor() {
		super('guarding');
	}

	reachedRange = 0;
	isAddableAction = () => {
		return true;
	};
	isAddableTarget = () => {
		return true;
	};
	newTarget = creep => {
		let flag;
		if (creep.data.destiny) flag = Game.flags[creep.data.destiny.flagName];
		if (!flag) {
			flag = Flag.find(FLAG_COLOR.defense, creep.pos, false, Flag.rangeMod, {
				rangeModPerCrowd: 400,
				// rangeModByType: creep.data.creepType
			});
		}

		if (creep.action === this && creep.flag) return creep.flag;
		if (flag) Population.registerCreepFlag(creep, flag);
		return flag;
	};
	work = creep => {
		if (creep.room.hostiles.length > 0) return ERR_INVALID_ARGS;
		if (creep.data.flagName) return OK;
		else return ERR_INVALID_ARGS;
	};
}

export default new GuardingAction();
