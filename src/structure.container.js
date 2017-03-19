export default (container, targetsHarvest, targetsBuild) => {


    const targets = container.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: tCreep =>
        tCreep.memory.role !== 'miner' &&
        tCreep.memory.role !== 'cleaner' &&
        ((targetsHarvest = 0) ? (tCreep.memory.role !== 'harvester' && tCreep.memory.role !== 'farHarvester') : null) &&
        ((targetsBuild = 0) ? tCreep.memory.role !== 'builder' : null)
    });

    let maxNum = 0, maxName;
    for (let name in targets) {
        let num = targets[name].carryCapacity - targets[name].carry.energy;
        if (num > maxNum) {
            maxNum = num;
            maxName = name
        }
    }
    if (maxName, maxNum != 0) {
        container.transfer(targets[maxName], RESOURCE_ENERGY, (maxNum > container.store['energy']) ? container.store['energy'] : maxNum);
        container.room.visual.text(
            '[Transfer]' + maxNum,
            container.pos.x + 1,
            container.pos.y,
            {align: 'left', opacity: 0.8});
    }
}