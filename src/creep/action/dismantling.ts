import { CreepAction } from '../Action';

class DismantlingAction extends CreepAction {
	constructor() {
		super('dismantling');
	}

	maxPerAction = 3;
	maxPerTarget = 3;
	renewTarget = false;

	isValidAction = creep => {
		return creep.carryCapacity === 0 || creep.sum < creep.carryCapacity;
	};
	isValidTarget = target => {
		return target != null;
	};
	newTarget = creep => {
		let target;
		let flag = FlagManager.find(FLAG_COLOR.destroy.dismantle, creep.pos, true);
		if (flag) {
			if (flag.room !== undefined) {
				// room is visible
				let targets = flag.room.lookForAt(LOOK_STRUCTURES, flag.pos.x, flag.pos.y);
				if (targets && targets.length > 0) return targets[0];
				else {
					// remove flag. try next flag
					let oldName = flag.name;
					RoomManager.costMatrixInvalid.trigger(flag.room);
					FlagManager.removeFromDir(flag.name);
					flag.remove();

					let otherFlagMod = (range, flagItem, args) => {
						if (flagItem.name == args) return Infinity;
						return range;
					};
					flag = FlagManager.find(FLAG_COLOR.destroy.dismantle, creep.pos, true, otherFlagMod, oldName);
					if (oldName == flag.name) Log.error('Removed flag found again in dismantling.newTarget!');
					if (flag) {
						if (flag.room !== undefined) {
							// room is visible
							let targets = flag.room.lookForAt(LOOK_STRUCTURES, flag.pos.x, flag.pos.y);
							if (targets && targets.length > 0) return targets[0];
							else {
								// remove flag. try next flag
								RoomManager.costMatrixInvalid.trigger(flag.room);
								FlagManager.removeFromDir(flag.name);
								flag.remove();
							}
						} else target = flag; // target in other room
					}
				}
			} else target = flag; // target in other room
		}
		return target;
	};
	work = creep => {
		return creep.dismantle(creep.target);
	};
}

export default new DismantlingAction();
