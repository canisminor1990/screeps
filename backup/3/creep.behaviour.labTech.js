const mod = new Creep.Behaviour('labTech');
module.exports = mod;
mod.inflowActions = (creep) => {
    return [
        Creep.action.reallocating,
        Creep.action.withdrawing,
        Creep.action.uncharging,
        Creep.action.picking
    ];
};
mod.outflowActions = (creep) => {
    let priority = [
        Creep.action.storing,
        Creep.action.charging,
        Creep.action.fueling,
        Creep.action.feeding
    ];
    if ( creep.sum > creep.carry.energy ||
            ( !creep.room.situation.invasion &&
                global.SPAWN_DEFENSE_ON_ATTACK && creep.room.conserveForDefense && creep.room.relativeEnergyAvailable > 0.8)) {
        priority.unshift(Creep.action.storing);
    }
    if (creep.room.structures.urgentRepairable.length > 0 ) {
        priority.unshift(Creep.action.fueling);
    }
    return priority;
};
mod.nextAction = function(creep) {
    return Creep.behaviour.hauler.nextAction.call(this, creep);
};
