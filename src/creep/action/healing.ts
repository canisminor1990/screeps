import { CreepAction } from '../Action';

class HealingAction extends CreepAction {
	constructor() {
		super('healing');
		this.setDefault({
			targetFilter: creep => {
				return target => {
					return target.my;
				};
			},
			moveOptions: options => {
				// // allow routing in and through hostile rooms
				// if (_.isUndefined(options.allowHostile)) options.allowHostile = true;
				return options;
			},
		});
	}

	targetRange = 3;
	isAddableAction = () => {
		return true;
	};
	isAddableTarget = (target, creep) => {
		const filter = creep.getStrategyHandler([this.name], 'targetFilter', creep);

		return filter && filter(target);
	};
	isValidTarget = (target, creep) => {
		if (
			target != null &&
			target.hits != null &&
			target.hits < target.hitsMax &&
			target.pos.roomName === creep.data.healRoom
		) {
			const filter = creep.getStrategyHandler([this.name], 'targetFilter', creep);

			return filter && filter(target);
		}

		return false;
	};
	newTarget = creep => {
		if (creep.room.hurtCreeps.length > 0) {
			for (const target of creep.room.hurtCreeps) {
				if (target.name !== creep.name) {
					creep.data.healRoom = target.pos.roomName;
					return target;
				}
			}
		}
		delete creep.data.healRoom;
		return null;
	};
	work = creep => {
		if (creep.target.hits < creep.target.hitsMax) {
			if (creep.pos.isNearTo(creep.target)) {
				return creep.heal(creep.target);
			}
			if (creep.pos.inRangeTo(creep.target, 3)) {
				return creep.rangedHeal(creep.target);
			}
			return OK;
		}
	};
}

export default new HealingAction();
