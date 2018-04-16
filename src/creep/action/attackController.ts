import { CreepAction } from '../../class';

class AttackControllerAction extends CreepAction {
	constructor() {
		super('attackController');
		this.setDefault({
			moveOptions: options => {
				// // allow routing in and through hostile rooms
				// if (_.isUndefined(options.allowHostile)) options.allowHostile = true;
				return options;
			},
		});
	}

	isValidAction = creep => {
		return true;
	};
	isValidTarget = (target, creep) => {
		return target && (!target.reservation || !Task.reputation.allyOwner(target.reservation)) && creep.flag;
	};
	isAddableAction = () => {
		return true;
	};
	isAddableTarget = target => {
		return (
			target &&
			(target instanceof Flag || (target.structureType === 'controller' && (target.reservation || target.owner)))
		);
	};
	newTarget = creep => {
		let validColor = flagEntry => Flag.compare(flagEntry, FLAG_COLOR.invade.attackController);

		let flag;
		if (creep.data.destiny) flag = Game.flags[creep.data.destiny.targetName];
		if (!flag) flag = Flag.find(validColor, creep.pos, false, Flag.reserveMod, creep.name);

		if (flag) {
			Population.registerCreepFlag(creep, flag);
		} else return null;

		// not there, go to flagged room
		if (!creep.flag.room || creep.flag.pos.roomName != creep.pos.roomName) {
			return creep.flag;
		}

		return creep.flag.room.controller;
	};

	step = creep => {
		if (CHATTY) creep.say(this.name, SAY_PUBLIC);
		if (creep.target.color) {
			if (creep.flag.pos.roomName == creep.pos.roomName) creep.data.targetId = null;
			creep.travelTo(creep.target);
			return;
		}

		let range = creep.pos.getRangeTo(creep.target);
		if (range <= this.targetRange) {
			let workResult = this.work(creep);
			if (workResult != OK) {
				creep.handleError({
					errorCode: workResult,
					action: this.name,
					target: creep.target,
					range,
					creep,
				});
			}
		} else {
			creep.travelTo(creep.target);
		}
	};
	work = creep => {
		let workResult;

		creep.controllerSign();

		if (
			(creep.target.owner && !creep.target.my) ||
			(creep.target.reservation && !Task.reputation.allyOwner(creep.target.reservation))
		) {
			workResult = creep.attackController(creep.target);
		} else {
			workResult = creep.claimController(creep.target);
		}
		return workResult;
	};
}

export default new AttackControllerAction();
