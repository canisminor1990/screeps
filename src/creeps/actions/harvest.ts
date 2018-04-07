import { ActionType } from '../../enums/action';
import { Action } from '../Action';

export class HarvestAction extends Action {
	target: Source;

	constructor() {
		super(ActionType.harvest);
	}

	maxPerTarget: number = 1;

	targetRange: number = 1;

	public run(creep: Creep): number {
		this.creep = creep;
		if (!this.isVaildAction()) return this.ERR_INVALID_ACTION;
		this.checkTarget();
		if (this.isValidTarget()) {
			this.assign();
		} else {
			this.unAssign();
			return ERR_INVALID_TARGET;
		}
		const direciton = creep.pos.getRangeTo(this.target);
		if (direciton === this.targetRange) {
			return creep.harvest(this.target);
		} else {
			return creep.moveTo(this.target);
		}
	}

	checkTarget() {
		const target = this.creep.target;
		if (!_.isUndefined(target) && target instanceof Source) {
			this.target = target as Source;
			return;
		}
		this.findNewTarget();
	}

	findNewTarget(): void {
		const targets = _.filter(this.creep.room.sources, s => s.active && s.targetOf < s.pos.getCanBuildSpaces(1).length);
		const target = this.creep.pos.findClosestByRange(targets);
		this.target = target;
		this.creep.setTarget(target);
	}

	isVaildAction(): boolean {
		if (this.creep.isFull) {
			this.unAssign();
			return false;
		}
		if (this.creep.action !== this.name && this.creep.actionStatus === true) return false;
		return true;
	}

	isValidTarget(): boolean {
		if (_.isUndefined(this.target) || _.isNull(this.target)) return false;
		if (!this.target.active) return false;
		return true;
	}
}
