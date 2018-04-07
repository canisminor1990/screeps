import { ActionType } from '../../enums/action';
import { Action } from '../Action';

export class BuildAction extends Action {
	private target: ConstructionSite;

	constructor() {
		super(ActionType.build);
	}

	maxPerTarget: number = 2;

	targetRange: number = 3;

	public run(creep: Creep): number {
		this.creep = creep;
		if (!this.isVaildAction()) return this.ERR_INVALID_ACTION;
		this.checkTarget();
		if (!this.isValidTarget()) return ERR_INVALID_TARGET;
		const direciton = creep.pos.getRangeTo(this.target);
		if (direciton <= this.targetRange) {
			this.assign();
			return creep.build(this.target);
		} else {
			return creep.moveTo(this.target);
		}
	}

	checkTarget() {
		const target = this.creep.target;
		if (!_.isUndefined(target) && target instanceof ConstructionSite) {
			this.target = target as ConstructionSite;
			return;
		}
		this.findNewTarget();
	}

	findNewTarget(): void {
		const targets = this.creep.room.constructionSites;
		const target = this.creep.pos.findClosestByRange(targets) as ConstructionSite;
		this.target = target;
		this.creep.setTarget(target);
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
