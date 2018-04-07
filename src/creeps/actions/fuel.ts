import { ActionType } from '../../enums/action';
import { Action } from '../Action';

export class FuelAction extends Action {
	private target: StructureSpawn | StructureExtension;

	constructor() {
		super(ActionType.fuel);
	}

	maxPerTarget: number = 1;

	targetRange: number = 1;

	public run(creep: Creep): number {
		this.creep = creep;
		if (!this.isVaildAction()) return this.ERR_INVALID_ACTION;
		this.checkTarget();
		if (!this.isValidTarget()) return ERR_INVALID_TARGET;
		const direciton = creep.pos.getRangeTo(this.target);
		if (direciton <= this.targetRange) {
			this.assign();
			return creep.transfer(this.target, RESOURCE_ENERGY);
		} else {
			return creep.moveTo(this.target);
		}
	}

	checkTarget() {
		const target = this.creep.target;
		if (!_.isUndefined(target) && target instanceof (StructureSpawn || StructureExtension)) {
			this.target = target as StructureSpawn | StructureExtension;
			return;
		}
		this.findNewTarget();
	}

	findNewTarget(): void {
		const room = this.creep.room;
		const spawns = _.filter(room.spawns, s => s.energy < s.energyCapacity && s.targetOf < this.maxPerTarget);
		const extensions = _.filter(room.extensions, s => s.energy < s.energyCapacity && s.targetOf < this.maxPerTarget);
		const targets = Array(0).concat(spawns, extensions);
		const target = this.creep.pos.findClosestByRange(targets) as StructureSpawn | StructureExtension;
		this.target = target;
		this.creep.setTarget(target);
	}

	isVaildAction(): boolean {
		if (this.creep.isEmpty) return false;
		if (this.creep.action === ActionType.upgrade) return false;
		return true;
	}

	isValidTarget(): boolean {
		if (_.isUndefined(this.target) || _.isNull(this.target)) return false;
		return true;
	}
}
