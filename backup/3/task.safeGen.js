// This task will react on safeGen flags white/brown
const mod = {};
module.exports = mod;
mod.minControllerLevel = 6;
mod.name = 'safeGen';
// hook into events
mod.register = () => {};
// for each flag
mod.handleFlagFound = flag => {
    // if it is a safeGen flag
    if (flag.compareTo(FLAG_COLOR.command.safeGen) && Task.nextCreepCheck(flag, mod.name)) {
        const room = Game.rooms[flag.pos.roomName];
        const valid = room && ((room.storage && room.storage.store[RESOURCE_GHODIUM]>=1000) ||
        (room.terminal && room.terminal.store[RESOURCE_GHODIUM]>=1000));
        if(valid){ 
            Util.set(flag.memory, 'task', mod.name);
            // check if a new creep has to be spawned
            Task.safeGen.checkForRequiredCreeps(flag);
        } else {
            flag.remove();
        }
    }
};
// check if a new creep has to be spawned
mod.checkForRequiredCreeps = (flag) => {
    // get task memory
    const memory = Task.safeGen.memory(flag);
    // re-validate if too much time has passed
    Task.validateAll(memory, flag, mod.name, {roomName: flag.pos.roomName, checkValid: true});
    // count creeps assigned to task
    const count = memory.queued.length + memory.spawning.length + memory.running.length;
    // if creep count below requirement spawn a new creep creep 
    if (count < 1) {
        Task.spawn(
            Task.safeGen.creep.safeGen, // creepDefinition
            { // destiny
                task: 'safeGen', // taskName
                targetName: flag.name, // targetName
            },
            { // spawn room selection params
                targetRoom: flag.pos.roomName,
                minEnergyCapacity: 2000,
                maxRange: 1,
                allowTargetRoom: true
            },
            creepSetup => { // callback onQueued
                let memory = Task.safeGen.memory(Game.flags[creepSetup.destiny.targetName]);
                memory.queued.push({
                    room: creepSetup.queueRoom,
                    name: creepSetup.name
                });
            });
    }
};
// when a creep starts spawning
mod.handleSpawningStarted = params => { // params: {spawn: spawn.name, name: creep.name, destiny: creep.destiny}
    // ensure it is a creep which has been queued by this task (else return)
    if (!params.destiny || !params.destiny.task || params.destiny.task != 'safeGen')
        return;
    // get flag which caused queueing of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    let flag = Game.flags[params.destiny.targetName || params.destiny.flagName];
    if (flag) {
        // get task memory
        const memory = Task.safeGen.memory(flag);
        // save spawning creep to task memory
        memory.spawning.push(params);
        // clean/validate task memory queued creeps
        Task.validateQueued(memory, flag, mod.name);
    }
};
// when a creep completed spawning
mod.handleSpawningCompleted = creep => {
    // ensure it is a creep which has been requested by this task (else return)
    if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != 'safeGen')
        return;
    // get flag which caused request of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    let flag = Game.flags[creep.data.destiny.targetName || creep.data.destiny.flagName];
    if (flag) {
        // calculate & set time required to spawn and send next substitute creep
        // TODO: implement better distance calculation
        creep.data.predictedRenewal = creep.data.spawningTime + (routeRange(creep.data.homeRoom, flag.pos.roomName) * 50);
        
        // get task memory
        const memory = Task.safeGen.memory(flag);
        // save running creep to task memory
        memory.running.push(creep.name);

        // clean/validate task memory spawning creeps
        Task.validateSpawning(memory, flag, mod.name);
    }
};
// when a creep died (or will die soon)
mod.handleCreepDied = name => {
    // get creep memory
    const mem = Memory.population[name];
    // ensure it is a creep which has been requested by this task (else return)
    if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'safeGen')
        return;
    // get flag which caused request of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    const flag = Game.flags[mem.destiny.targetName || mem.destiny.flagName];
    if (flag) {
        const memory = Task.safeGen.memory(flag);
        Task.validateRunning(memory, flag, mod.name, {roomName: flag.pos.roomName, deadCreep: name});
    }
};
// get task memory
mod.memory = (flag) => {
    if (!flag.memory.tasks)
        flag.memory.tasks = {};
    if (!flag.memory.tasks.safeGen) {
        flag.memory.tasks.safeGen = {
            queued: [],
            spawning: [],
            running: []
        };
    }
    return flag.memory.tasks.safeGen;
};

mod.creep = {
    safeGen: {
        multiBody: [CARRY, MOVE],
        maxMulti:20,
        maxWeight:2000,
        name: "safeGen",
        behaviour: "safeGen",
        queue: 'Low'
    },
};
