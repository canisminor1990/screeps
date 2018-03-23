const action = new Creep.Action('safeGen');
module.exports = action;
action.maxPerAction=1;
action.isValidAction = function(creep) {
    return ( creep.carryCapacity - _.sum(creep.carry) >=1000 || (creep.carry[RESOURCE_GHODIUM] && creep.carry[RESOURCE_GHODIUM]>=1000));
};
action.newTarget = function(creep) {
    let target = null;
    if(!creep.carry[RESOURCE_GHODIUM] || creep.carry[RESOURCE_GHODIUM]<1000){
        if(creep.room.storage && creep.room.storage.store[RESOURCE_GHODIUM] && creep.room.storage.store[RESOURCE_GHODIUM]>=1000){
            target = creep.room.storage;
        } else if(creep.room.terminal && creep.room.terminal.store[RESOURCE_GHODIUM] && creep.room.terminal.store[RESOURCE_GHODIUM]>=1000){
            target = creep.room.terminal;
        }
    } else {
        target = creep.room.controller;
    }
    return target;
};
action.unloadStructure = function(creep){
    let amount = 0;
    if(creep.carry[RESOURCE_GHODIUM]){
        amount = 1000 - creep.carry[RESOURCE_GHODIUM];
    } else {
        amount = 1000;
    }
    return creep.withdraw(creep.target, RESOURCE_GHODIUM, amount);
};
action.generateSafeMode = function(creep){
    return creep.generateSafeMode(creep.target);
};
action.work = function(creep){
    let workResult = null;
    let target = creep.target;
    switch(target.structureType){
        case STRUCTURE_STORAGE:
            workResult = this.unloadStructure(creep);
            break;
        case STRUCTURE_TERMINAL:
            workResult = this.unloadStructure(creep);
            break;
        case STRUCTURE_CONTROLLER:
            workResult = this.generateSafeMode(creep);
            break;
        default:
            if(creep.data.creepType=='safeGen' && Game.flags[creep.data.destiny.targetName]) Game.flags[creep.data.destiny.targetName].remove();
            this.cancelAction(creep);
            break;
    }
    return workResult;
};
action.cancelAction = function(creep) {
    delete creep.data.actionName;
    delete creep.data.targetId;
    creep.action = null;
    creep.target = null;
    delete creep.data.path;
};
