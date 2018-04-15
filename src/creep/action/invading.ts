import { CreepAction } from '../../class';

class InvadingAction extends CreepAction {
	constructor() {
		super('invading');
		this.setDefault({
			moveOptions: options => {
				// allow routing in and through hostile rooms
				if (_.isUndefined(options.allowHostile)) options.allowHostile = true;
				return options;
			},
		});
	}

	isValidAction = creep => {
		return Flag.hasInvasionFlag();
	};
	isAddableAction = () => {
		return true;
	};
	isAddableTarget = () => {
		return true;
	};
	getFlaggedStructure = (flagColor, pos) => {
		let flagsEntries = Flag.filter(flagColor, pos, true);
		let target = [];
		let checkFlag = flagEntry => {
			let flag = Game.flags[flagEntry.name];
			if (flag && flag.pos.roomName == pos.roomName && flag.room !== undefined) {
				// room is visible
				let targets = flag.room.lookForAt(LOOK_STRUCTURES, flag.pos.x, flag.pos.y);
				if (targets && targets.length > 0) {
					const addTarget = structure => {
						structure.destroyFlag = flag;
						target.push(structure);
					};
					targets.forEach(addTarget);
				} else {
					// remove flag. try next flag
					flag.remove();
				}
			}
		};
		flagsEntries.forEach(checkFlag);
		if (target && target.length > 0) return pos.findClosestByRange(target);
		return null;
	};
	newTarget = creep => {
		let destroy = this.getFlaggedStructure(FLAG_COLOR.destroy, creep.pos);
		if (destroy) {
			if (destroy.destroyFlag) Population.registerCreepFlag(creep, destroy.destroyFlag);
			return destroy;
		}
		// move to invasion room
		let flag = Flag.find(FLAG_COLOR.invade, creep.pos, false);
		if (flag && (!flag.room || flag.pos.roomName != creep.pos.roomName)) {
			Population.registerCreepFlag(creep, flag);
			return flag; // other room
		}
		if (!flag) {
			// unregister
			creep.action = null;
			delete creep.data.actionName;
			delete creep.data.targetId;
			return;
		}

		if (!flag.room.controller || !flag.room.controller.my) {
			// attack healer
			let target = creep.pos.findClosestByRange(creep.room.hostiles, {
				filter: hostile => {
					return _.some(hostile.body, { type: HEAL });
				},
			});
			if (target) return target;
			// attack attacker
			target = creep.pos.findClosestByRange(creep.room.hostiles, {
				filter: hostile => {
					return _.some(hostile.body, part => {
						return part.type == ATTACK || part.type == RANGED_ATTACK;
					});
				},
			});
			if (target) return target;

			// attack tower
			target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
				filter: structure => {
					return structure.structureType == STRUCTURE_TOWER;
				},
			});
			if (target) return target;
			// attack remaining creeps
			target = creep.pos.findClosestByRange(creep.room.hostiles);
			if (target) return target;
			// attack spawn
			target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
				filter: structure => {
					return structure.structureType == STRUCTURE_SPAWN;
				},
			});
			if (target) return target;
			// attack structures
			target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
				filter: structure => {
					return structure.structureType != STRUCTURE_CONTROLLER;
				},
			});
			if (target) return target;
			// attack construction sites
			target = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
			if (target) return target;
		}
		// no target found
		flag.remove();
		return null;
	};
	step = creep => {
		if (CHATTY) creep.say(this.name);
		if (creep.target instanceof Flag && creep.target.pos.roomName == creep.pos.roomName)
			this.assign(creep);
		this.run[creep.data.creepType](creep);
	};
	run = {
		melee: creep => {
			if (!creep.flee) {
				if (creep.target instanceof Flag) {
					creep.travelTo(creep.target);
					return;
				} else if (creep.target instanceof ConstructionSite) {
					creep.travelTo(creep.target, { range: 0 });
					return;
				}
				creep.travelTo(creep.target);
			}
			if (!creep.target.my) creep.attacking = creep.attack(creep.target) == OK;
		},
		ranger: creep => {
			let range = creep.pos.getRangeTo(creep.target);
			if (!creep.flee) {
				if (creep.target instanceof Flag) {
					creep.travelTo(creep.target);
					return;
				} else if (creep.target instanceof ConstructionSite) {
					creep.travelTo(creep.target, { range: 0 });
					return;
				}
				if (range > 3) {
					creep.travelTo(creep.target);
				}
				if (range < 3) {
					creep.move(creep.target.pos.getDirectionTo(creep));
				}
			}
			// attack
			let targets = creep.pos.findInRange(creep.room.hostiles, 3);
			if (targets.length > 2) {
				// TODO: calc damage dealt
				if (CHATTY) creep.say('MassAttack');
				creep.attackingRanged = creep.rangedMassAttack() == OK;
				return;
			}
			if (range < 4) {
				creep.attackingRanged = creep.rangedAttack(creep.target) == OK;
				return;
			}
			if (targets.length > 0) {
				creep.attackingRanged = creep.rangedAttack(targets[0]) == OK;
			}
		},
	};
}

export default new InvadingAction();
