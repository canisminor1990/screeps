import { ActionType } from '../../enums/action';
import { Action } from '../Action';

export class UpgradeAction extends Action {
	private target: StructureController;

	constructor() {
		super(ActionType.upgrade);
	}

	maxPerTarget: number = 9;

	targetRange: number = 3;

	public run(creep: Creep): number {
		this.creep = creep;
		if (!this.isVaildAction()) return this.ERR_INVALID_ACTION;
		this.checkTarget();
		if (!this.isValidTarget()) return ERR_INVALID_TARGET;
		const direciton = creep.pos.getRangeTo(this.target);
		if (direciton <= this.targetRange) {
			this.assign();
			return creep.upgradeController(this.target);
		} else {
			return creep.moveTo(this.target);
		}
	}

	checkTarget() {
		const target = this.creep.target;
		if (!_.isUndefined(target) && target instanceof StructureController) {
			this.target = target as StructureController;
			return;
		}
		this.findNewTarget();
	}

	findNewTarget(): void {
		let target = this.creep.room.controller as StructureController;
		if (target.targetOf < this.maxPerTarget) {
			this.target = target;
			this.creep.setTarget(target);
		}
	}

	isVaildAction(): boolean {
		if (this.creep.isEmpty && this.creep.action !== this.name) return false;
		return true;
	}

	isValidTarget(): boolean {
		if (_.isUndefined(this.target) || _.isNull(this.target)) return false;
		return true;
	}
}
