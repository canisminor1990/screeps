const action = new Creep.Action('avoiding');
module.exports = action;
action.lairDangerTime = 24;
action.lairDangerRange = 14;
action.targetRange = 0;
action.reachedRange = 0;
action.isActiveLair = function(target) {
    return !_.isUndefined(target.ticksToSpawn) && target.ticksToSpawn <= action.lairDangerTime;
};
action.isValidAction = function(creep){
    return creep.data.destiny && creep.data.destiny.room === creep.room.name &&
        (Room.isSKRoom(creep.room.name) || creep.room.situation.invasion);
};
action.isAddableAction = function(creep) {
    return true;
};
action.isValidTarget = function(target, creep){
    if (Task.reputation.npcOwner(target)) {
        // not a lair(creep most likely), or an active lair
        return _.isUndefined(target.ticksToSpawn) || action.isActiveLair(target);
    } else if (Task.reputation.hostileOwner(target) && target.hasActiveBodyparts) {
        return target.hasActiveBodyparts([ATTACK,RANGED_ATTACK]);
    }
    return false;
};
action.newTarget = function(creep) {
    if (Room.isSKRoom(creep.pos.roomName)) {
        const target = _.first(creep.room.find(FIND_STRUCTURES, {filter: function (t) {
            return action.isActiveLair(t) && creep.pos.getRangeTo(t.pos) <= action.lairDangerRange;
        }}));

        if (target) {
            return target;
        }
    }

    if (creep.room.situation.invasion) {
        const target = _.chain(creep.room.hostiles).filter(function(target) {
            return action.isValidTarget(target);
        }).map(function(target) {
            // TODO react to players? getStrategyHandler
            let score = 0;
            const range = creep.pos.getRangeTo(target);
            if (creep.owner.username === "Invader") {
                score = range - 51;
            } else if (range < 10) {
                score = range - 11;
            } else {
                score = 0;
            }
            return {target, score};
        }).filter('score').sortBy('score').first().get('target').value();

        if (target) {
            return target;
        }
    }
};
action.work = function(creep) {
    if (!(creep.data.safeSpot && creep.data.safeSpot.roomName)) {
        const flag = creep.data.destiny && Game.flags[creep.data.destiny.targetName];
        if (flag) {
            creep.data.safeSpot = flag.pos;
        } else {
            // find the route home, move toward the exit until out of danger
            const exit = _.chain(creep.room.findRoute(creep.data.homeRoom)).first().get('exit').value();
            if (exit) {
                creep.data.safeSpot = creep.pos.findClosestByRange(exit);
                creep.data.safeSpot.roomName = creep.pos.roomName;
            }
        }
    }

    if (creep.data.safeSpot) {
        if (creep.pos.getRangeTo(creep.target) < 10) {
            creep.travelTo(creep.data.safeSpot);
        } else {
            creep.idleMove();
        }
    }
};
action.run = function(creep) {
    if( action.isValidAction(creep) ) {
        if (creep.action === action && action.isValidTarget(creep.target, creep) ||
            action.isAddableAction(creep) && action.assign(creep) ) {

            if (creep.leaveBorder()) {
                return true;
            }

            action.work(creep);
            return true;
        }
    }
};