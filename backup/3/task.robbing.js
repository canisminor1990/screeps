// This task will react on robbing flags (invade/rob or red/yellow), sending 2 creeps to rob that room
let mod = {};
module.exports = mod;
mod.name = 'robbing';
// hook into events
mod.register = () => {};
mod.checkFlag = (flag) => {
    // robbing own rooms is handled by Task.delivery
    //return !(flag.room && flag.room.my) && flag.compareTo(FLAG_COLOR.invade.robbing) && Task.nextCreepCheck(flag, mod.name);
    return flag.compareTo(FLAG_COLOR.invade.robbing) && Task.nextCreepCheck(flag, mod.name);
};
// for each flag
mod.handleFlagFound = flag => {
    // if it is a robbing flag
    if (Task.robbing.checkFlag(flag)) {
        Util.set(flag.memory, 'task', mod.name);
        // check if a new creep has to be spawned
        Task.robbing.checkForRequiredCreeps(flag);
    }
};
// check if a new creep has to be spawned
mod.checkForRequiredCreeps = (flag) => {
    // get task memory
    let memory = Task.robbing.memory(flag);
    // re-validate if too much time has passed
    Task.validateAll(memory, flag, mod.name, {roomName: flag.pos.roomName, checkValid: true});
    // count creeps assigned to task
    const count = memory.queued.length + memory.spawning.length + memory.running.length;
    const roomName = flag.pos.roomName;
    
    // if creep count below requirement spawn a new creep creep 
    if( count < (memory.numRobbers || 2) ) {
        const spawnRoom = mod.strategies.robber.spawnRoom(roomName);
        if( !spawnRoom ) {
            return;
        }
        // robbers set homeRoom if closer storage exists
        const storageRoom = ROBBER_REHOME ? spawnRoom : mod.strategies.robber.homeRoom(flag);
        Task.spawn(
            Task.robbing.creep.robbing, // creepDefinition
            { // destiny
                task: mod.name, // taskName
                targetName: flag.name, // targetName
                flagName: flag.name,
                homeRoom: storageRoom instanceof Room ? storageRoom.name : storageRoom
            },
            { // spawn room selection params
                targetRoom: roomName,
                allowTargetRoom:true,
                // explicit: spawnRoom.name,
            },
            creepSetup => { // callback onQueued
                let memory = Task.robbing.memory(Game.flags[creepSetup.destiny.targetName]);
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
    if ( !params.destiny || !params.destiny.task || params.destiny.task != 'robbing' )
        return;
    // get flag which caused queueing of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    let flag = Game.flags[params.destiny.targetName || params.destiny.flagName];
    if (flag) {
        // get task memory
        let memory = Task.robbing.memory(flag);
        // save spawning creep to task memory
        memory.spawning.push(params);
        // clean/validate task memory queued creeps
        Task.validateQueued(memory, flag, mod.name);
    }
};
// when a creep completed spawning
mod.handleSpawningCompleted = creep => {
    // ensure it is a creep which has been requested by this task (else return)
    if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != 'robbing')
        return;
    if( creep.data.destiny.homeRoom ) {
        creep.data.homeRoom = creep.data.destiny.homeRoom;
    }
    // get flag which caused request of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    let flag = Game.flags[creep.data.destiny.targetName || creep.data.destiny.flagName];
    if (flag) {
        // calculate & set time required to spawn and send next substitute creep
        // TODO: implement better distance calculation
        creep.flag=flag;
        creep.data.predictedRenewal = creep.data.spawningTime + (routeRange(creep.data.homeRoom, flag.pos.roomName)*50);

        // get task memory
        let memory = Task.robbing.memory(flag);
        // save running creep to task memory
        memory.running.push(creep.name);
        // clean/validate task memory spawning creeps
        Task.validateSpawning(memory, flag, mod.name);
    }
};
// when a creep died (or will die soon)
mod.handleCreepDied = name => {
    // get creep memory
    let mem = Memory.population[name];
    // ensure it is a creep which has been requested by this task (else return)
    if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'robbing')
        return;
    // get flag which caused request of that creep
    // TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
    let flag = Game.flags[mem.destiny.targetName || mem.destiny.flagName];
    if (flag) {
        const memory = Task.robbing.memory(flag);
        Task.validateRunning(memory, flag, mod.name, {roomName: flag.pos.roomName, deadCreep: name});
    }
};
// get task memory
mod.memory = (flag) => {
    if( !flag.memory.tasks ) 
        flag.memory.tasks = {};
    if( !flag.memory.tasks.robbing ) {
        flag.memory.tasks.robbing = {
            queued: [], 
            spawning: [],
            running: [],
            numRobbers: 2
        };
    }
    return flag.memory.tasks.robbing;
};
mod.nextAction = function(creep){
    if(!Game.flags[creep.data.destiny.targetName]) {
        return Creep.action.recycling.assign(creep);
    }
    let carrySum = creep.sum;
    // at home
    if( creep.pos.roomName == creep.data.homeRoom ){
        // carrier filled
        if( carrySum > 0 ){
            let deposit = []; // deposit energy in...
            // links?
            if( creep.carry.energy == carrySum ) deposit = creep.room.structures.links.privateers;
            // storage?
            if( creep.room.storage ) deposit.push(creep.room.storage);
            // containers?
            if( creep.room.structures.container ) deposit = deposit.concat( creep.room.structures.container.privateers );
            // Choose the closest
            deposit = _(deposit).filter({'my':true});
            if( deposit.length > 0 ){
                let target = creep.pos.findClosestByRange(deposit);
                if (target.structureType === STRUCTURE_STORAGE && this.assignAction(creep, 'storing', target)) return;
                else if (Creep.action.charging.assign(creep, target)) return;
            } else if(Creep.action.dropping.assign(creep)){
                return;
            } else {
            //if( Creep.action.storing.assign(creep) ) return;
            if (Creep.action.charging.assign(creep)) return;
            if (!creep.room.ally && Creep.action.storing.assign(creep)) return;
            Creep.behaviour.worker.nextAction.call(this, creep);
            return;
            }
        }
        // empty
        // travelling
        if( this.exploitNextRoom(creep) )
            return;
        else {
            // no new flag
            // behave as worker
            Creep.behaviour.worker.nextAction.call(this, creep);
            return;
        }
    }
    // not at home
    else {
        // at target room
        if( creep.data.destiny.targetName && Game.flags[creep.data.destiny.targetName].pos.roomName == creep.pos.roomName ){
            // check invader/cloaking state
            if( creep.room.situation.invasion && !Game.flags[creep.data.destiny.targetName].pos.roomName == creep.pos.roomName) {
                // creep.flag.cloaking = 50; // TODO: set to Infinity & release when solved
                this.exploitNextRoom(creep);
                return;
            }
            // get some energy
            if( creep.sum < creep.carryCapacity*0.8 ) {
                // sources depleted
                if( creep.room.sourceEnergyAvailable === 0 ){
                    // cloak flag
                    // creep.flag.cloaking = _.max([creep.room.ticksToNextRegeneration-20,0]); // approach a bit earlier
                    // travelling
                    this.exploitNextRoom(creep);
                    return;
                }
                // energy available
                else {
                    // harvesting or picking
                    var actions = [
                        Creep.action.withdrawing,
                        Creep.action.dismantling,
                        Creep.action.picking,
                        Creep.action.robbing,
                        Creep.action.harvesting
                    ];
                    // TODO: Add extracting (if extractor present) ?
                    for(var iAction = 0; iAction < actions.length; iAction++) {
                        var action = actions[iAction];
                        if(action.isValidAction(creep) &&
                            action.isAddableAction(creep) &&
                            action.assign(creep))
                            return;
                    }
                    // no targets in current room
                    // creep.flag.cloaking = 50;
                    this.exploitNextRoom(creep);
                    return;
                }
            }
            // carrier full
            else {
                if(PRIVATEERS_BUILD){
                    var actions = [Creep.action.building];
                    for(var iAction = 0; iAction < actions.length; iAction++) {
                        var action = actions[iAction];
                        if(action.isValidAction(creep) &&
                            action.isAddableAction(creep) &&
                            action.assign(creep))
                            return;
                    }
                }
                Population.registerCreepFlag(creep, null);
                Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
                return;
            }
        }
        // not at target room
        else {
                this.exploitNextRoom(creep);
                return;
        }
    }
    // fallback
    Creep.action.idle.assign(creep);
};
mod.exploitNextRoom = function(creep){
    if( creep.sum < creep.carryCapacity*0.4 ) {
        // calc by distance to home room
        let validColor = flagEntry => (
            Flag.compare(flagEntry, FLAG_COLOR.invade.exploit) || Flag.compare(flagEntry, FLAG_COLOR.invade.robbing)
        );
        let flag = FlagDir.find(validColor, new RoomPosition(25, 25, creep.data.homeRoom), false, FlagDir.exploitMod, creep.name);
        // new flag found
        if( flag ) {
            // travelling
            if( Creep.action.travelling.assignRoom(creep, flag.pos.roomName) ) {
                Population.registerCreepFlag(creep, flag);
                return true;
            }
        }
    }
    // no new flag
    // go home
    Population.registerCreepFlag(creep, null);
    if (creep.room.name !== creep.data.homeRoom) {
        Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
    }
    return false;
};
mod.goHome = creep => {
    Population.registerCreepFlag(creep, null);
    Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
    return false;
};
mod.getFlag = function(roomName) {
    // let validColor = flagEntry => (
    //     (flagEntry.color == FLAG_COLOR.invade.robbing.color && flagEntry.secondaryColor == FLAG_COLOR.invade.robbing.secondaryColor)
    // );
    // return FlagDir.find(validColor, new RoomPosition(25, 25, roomName), false);
    return FlagDir.find(FLAG_COLOR.invade.robbing, Game.rooms[roomName]);
};
mod.storage = function(roomName, storageRoom) {
    const memory = Task.robbing.memory(mod.getFlag(roomName));
    if (storageRoom) {
        const was = memory.storageRoom;
        memory.storageRoom = storageRoom;
        return `Task.${mod.name}: room ${roomName}, now sending haulers to ${storageRoom}, (was ${was})`;
    } else if (!memory.storageRoom) {
        return `Task.${mod.name}: room ${roomName}, no custom storage destination`;
    } else if (storageRoom === false) {
        const was = memory.storageRoom;
        delete memory.storageRoom;
        return `Task.${mod.name}: room ${roomName}, cleared custom storage room (was ${was})`;
    } else {
        return `Task.${mod.name}: room ${roomName}, sending haulers to ${memory.storageRoom}`;
    }
};
mod.gotoTargetRoom = (creep, flag) => {
    if( Creep.action.travelling.assignRoom(creep, flag.pos.roomName) ) {
        Population.registerCreepFlag(creep, flag);
        return true;
    }
};
mod.creep = {
    robbing: {
        fixedBody: [],
        multiBody: [CARRY, MOVE],
        name: "robber", 
        behaviour: "privateer", 
        queue: 'Low'
    },
};
mod.strategies = {
    defaultStrategy: {
        name: `default-${mod.name}`,
    },
    robber: {
        name: `robber-${mod.name}`,
        homeRoom: function(flag) {
            // Explicity set by user?
            const memory = Task.robbing.memory(flag);
            if(memory.storageRoom) return memory.storageRoom;
            // Otherwise, score it
            return Room.bestSpawnRoomFor(flag.pos.roomName);
        },
        spawnRoom: function(roomName, minWeight) {
            return Room.findSpawnRoom({
                targetRoom: roomName,
                allowTargetRoom:true,
                minEnergyCapacity: minWeight || 250,
            });
        },
    },
    withdrawing: {
        name: `withdrawing-${mod.name}`,
        isValidAction: function(creep) {
            return true;
        },
    }
};
