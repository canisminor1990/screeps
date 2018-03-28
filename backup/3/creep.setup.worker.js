let setup = new Creep.Setup('worker');
module.exports = setup;
setup.maxWorker = room => {
    let count = 0;
    if(room.structures.fortifyable.length>0 || room.isCriticallyFortifyable){
        count++;
    }
	// no hauler and no miner => 1
    // if there is a miner it should be no problem to spawn a hauler, and vice versa. 
    // if none of them are present spawn a worker first
    if (room.controller.level < 4) {
        if (room.situation.invasion) return 1;
        let max = room.controller.level === 2 ? 3 * room.sources.length : 2 * room.sources.length;
        const numPioneers = room.population && room.population.typeCount.pioneer || 0;
        return max - numPioneers;
    }
    if( !setup.hasMinerOrHauler(room))
        count = count + 1;
    // constructionsites present & no strorage or storage > min
    if( room.myConstructionSites.length > 0 && ((!room.storage || !room.storage.active)
        || room.storage.store && room.storage.charge > 0) && count<=1)
        count = count + 1;
    return count;
};
// validates if there is a miner or a hauler present
setup.hasMinerOrHauler = room => ( room.population &&
    ((room.population.typeCount.hauler && room.population.typeCount.hauler > 0) ||
    (room.population.typeCount.miner && room.population.typeCount.miner > 0 )));
// this assures that the first worker gets spawned immediately, but later workers require more energy, giving preference to miners
setup.byPopulation = function(type, start, perBody, limit) {
    return function(room) {
        const result = start + (room.population && (room.population.typeCount[type] * perBody) || 0);
        if( !limit || result <= limit ) {
            return result;
        } else {
            return limit;
        }
    };
};
setup.minEnergyAvailable = function(room) {
    if (room.controller.level === 1) {
        return Creep.setup.worker.byPopulation(Creep.setup.worker.type, 0, 1, 1);
    } else if (room.controller.level === 2) {
        return Creep.setup.worker.byPopulation(Creep.setup.worker.type, 0, 0.8, 1);
    } else if (room.controller.level === 3) {
        return Creep.setup.worker.byPopulation(Creep.setup.worker.type, 0, 0.6, 1);
    } else if (room.controller.level < 7) {
        return Creep.setup.worker.hasMinerOrHauler(room) ? 0.5 : 0;
    } else if (room.controller.level === 7) {
        return Creep.setup.worker.hasMinerOrHauler(room) ? 0.2 : 1;
    } else {
        return Creep.setup.worker.hasMinerOrHauler(room) ? 0.1 : 1;
    }
};
setup.maxMulti = function(room, fixedCost, multiCost, multiLength) {
    return _.min([Math.floor((room.energyCapacityAvailable - fixedCost) / multiCost), Math.floor(50/multiLength)]);
};
setup.default = {
    fixedBody: [],
    multiBody: {
        [CARRY]: 1,
        [WORK]: 1,
        [MOVE]: 1,
    },
    // minMulti: room => Creep.setup.worker.minMulti(room, 0, 200),
    minMulti:1,
    maxMulti: room => Creep.setup.worker.maxMulti(room, 0 ,200, _.size(Creep.setup.worker.default.multiBody)),
    maxWeight: 9600,
    maxCount: room => Creep.setup.worker.maxWorker(room),
    minEnergyAvailable: room => Creep.setup.worker.minEnergyAvailable(room),
};
setup.low = {
    fixedBody: [],
    multiBody: {
        [CARRY]: 1,
        [WORK]: 1,
        [MOVE]: 2,
    },
    minMulti: 1,
    maxMulti: 8,
    maxWeight: room => room.controller.level === 2 ? 14400 : 4000,
    maxCount: room => Creep.setup.worker.maxWorker(room),
    minEnergyAvailable: room => Creep.setup.worker.minEnergyAvailable(room),
};
setup.RCL = {
    1: setup.low,
    2: setup.low,
    3: setup.default,
    4: setup.default,
    5: setup.default,
    6: setup.default,
    7: setup.default,
    8: setup.default,
};
