let action = new Creep.Action('harvesting');
module.exports = action;
action.renewTarget = false;
action.isValidAction = function(creep){
    return ( creep.sum < creep.carryCapacity && creep.room.sourceEnergyAvailable > 0 );
};
action.isValidTarget = function(target, creep) {
    return (target !== null && target.energy !== null && target.energy > 0 &&
        (target.targetOf === undefined || 
            (target.targetOf.length <= target.accessibleFields &&
                !_.some(target.targetOf, c => (c.creepType === 'miner' || c.creepType === 'remoteMiner')
                    && c.body.work >= 5
                    && (c.ticksToLive || CREEP_LIFE_TIME) >= (c.data && c.data.predictedRenewal || 0)
                )
            )
        ));
};
action.isAddableTarget = function(target, creep){
    return (
        (!creep.room.controller ||
            (
                (!creep.room.controller.owner || creep.room.controller.my) && // my room or not owned
                (!creep.room.controller.reservation || creep.room.controller.reservation.username == creep.owner.username) // my reservation or none
            )
        )
    ) && ( target.targetOf === undefined || target.targetOf.length < target.accessibleFields );
};
action.newTarget = function(creep) {
    const roomSources = _.sortBy(creep.room.sources, s => creep.pos.getRangeTo(s));
    for (const source of roomSources) {
        if (this.isValidTarget(source, creep) && this.isAddableTarget(source, creep)) {
            return source;
        }
    }
    return null;
};
action.work = function(creep){
    return creep.harvest(creep.target);
};
