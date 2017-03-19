export default (container) => {
    const targets = container.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: tCreep => tCreep.memory.role !== 'miner'
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
        console.log()
        container.room.visual.text(
            '[Transfer]' + maxNum,
            container.pos.x + 1,
            container.pos.y,
            {align: 'left', opacity: 0.8});
    }
}