const mod = new Creep.Behaviour('claimer');
module.exports = mod;
const super_run = mod.run;
mod.run = function(creep) {
    super_run.call(this, creep);
    if (creep.hits < creep.hitsMax && (!creep.action || creep.action.name !== 'travelling')) { // creep injured. move to next owned room
        if (creep.data) {
            if (!creep.data.nearestHome || !Game.rooms[creep.data.nearestHome]) {
                const nearestSpawnRoom = Room.bestSpawnRoomFor(creep.pos.roomName);
                if (nearestSpawnRoom) {
                    creep.data.nearestHome = nearestSpawnRoom.name;
                }
            }
            if (creep.data.nearestHome) {
                Creep.action.travelling.assignRoom(creep, creep.data.nearestHome);
            }
        }
    }
    if( global.DEBUG && global.TRACE ) trace('Behaviour', {creepName:creep.name, run:creep.action && creep.action.name || 'none', [this.name]: 'run', Behaviour:this.name});
};
mod.actions = (creep) => {
    return [
        Creep.action.claiming,
        Creep.action.reserving,
        Creep.action.bulldozing,
    ];
};
