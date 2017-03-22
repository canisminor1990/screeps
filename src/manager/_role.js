import * as role from '../role';
// import config from '../config'
export default (room) => {
    const Memory = room.memory;
    const targetStructures = Memory.structures;
    const myCreeps = Memory.creeps.my;
    const dropped = (Memory.dropped) ? Memory.dropped.energy : [];
    const newRoom = new RoomPosition(25, 47, 'W81S66');

    // creepRoleRun(myCreep, config(room).role)

    myCreeps.harvester.forEach(creep => role.harvester(creep, dropped))
    myCreeps.miner.forEach(creep => role.miner(creep, Memory.sources, dropped))
    myCreeps.upgrader.forEach(creep => role.upgrader(creep, targetStructures.controller))
    myCreeps.builder.forEach(creep => role.builder(creep, targetStructures.needBuild))
    myCreeps.cleaner.forEach(creep => role.cleaner(creep, dropped))
    // far
    myCreeps.farHarvester.forEach(creep => role.farHarvester(creep,newRoom))
    myCreeps.farMiner.forEach(creep => role.farMiner(creep, newRoom))
    myCreeps.claim.forEach(creep => role.claim(creep, newRoom))

}

