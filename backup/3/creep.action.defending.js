let action = new Creep.Action('defending');
module.exports = action;
action.isValidAction = function (creep) { return creep.room.hostiles.length > 0; };
action.isAddableAction = function () { return true; };
action.isAddableTarget = function () { return true; };
action.isValidTarget = function (target) {
    return (
        target &&
        target.hits != null &&
        target.hits > 0 &&
        target.my == false);
};
action.newTarget = function (creep) {
    var closestHostile = creep.pos.findClosestByRange(creep.room.hostiles, {
        filter: creep.getStrategyHandler([action.name], 'priorityTargetFilter', creep)
    });
    if (!closestHostile) {
        closestHostile = creep.pos.findClosestByRange(creep.room.hostiles, {
            filter: creep.getStrategyHandler([action.name], 'targetFilter', creep)
        });
    }
    return closestHostile;
};
action.step = function (creep) {
    if (global.CHATTY) creep.say(this.name, global.SAY_PUBLIC);
    if (creep.target.pos.roomName !== creep.room.name) return Creep.action.travelling.assignRoom(creep, creep.target.pos.roomName);
    this.run[creep.data.creepType](creep);
};
action.run = {
    ranger: function (creep) {
        let range = creep.pos.getRangeTo(creep.target);
        if (!creep.flee) {
            if (range > 3) {
                creep.travelTo(creep.target, { respectRamparts: COMBAT_CREEPS_RESPECT_RAMPARTS });
            }
            if (range < 3) {
                let direction = creep.target.pos.getDirectionTo(creep);
                if (direction) {
                    if (COMBAT_CREEPS_RESPECT_RAMPARTS &&
                        !_.filter(creep.pos.lookFor(LOOK_STRUCTURES), {my: true, structureType: STRUCTURE_RAMPART})) {
                        creep.move(direction);
                    }
                    if (range === 1) {
                        creep.attacking = creep.attack(creep.target) == OK;
                    }
                }
            }
        }

        // attack ranged
        let targets = creep.pos.findInRange(creep.room.hostiles, 3);
        if (targets.length > 2) { // TODO: precalc damage dealt
            if (global.CHATTY) creep.say('MassAttack');
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
    melee: function (creep) {
        if (!creep.flee) {
            creep.travelTo(creep.target, {respectRamparts: COMBAT_CREEPS_RESPECT_RAMPARTS});
        }
        // attack
        let attacking = creep.attack(creep.target);
        if (attacking == ERR_NOT_IN_RANGE) {
            let targets = creep.pos.findInRange(creep.room.hostiles, 1);
            if (targets.length > 0)
                creep.attacking = creep.attack(targets[0]) == OK;
        } else creep.attacking = attacking == OK;
    }
};
action.defaultStrategy.priorityTargetFilter = function (creep) {
    return function (hostile) {
        return hostile.hasBodyparts(HEAL);
    }
};
action.defaultStrategy.targetFilter = function (creep) {
    return function (hostile) {
        return true;
    }
};
