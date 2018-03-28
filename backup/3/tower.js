let mod = {};
module.exports = mod;
mod.loop = function (room) {
    var run = tower => this.run(tower);
    _.forEach(room.structures.towers, run);
};
mod.run = function (tower) {
    if (tower) {
        const p = Util.startProfiling(tower.room.name + ':tower:' + tower.id, {enabled: PROFILING.ROOMS});
        // TODO: convert to action pattern
        if (tower.room.casualties.length > 0) {
            // Heal
            let target = tower.room.casualties[0];
            if (target.hitsMax - target.hits >= 400 || !tower.room.situation.invasion) {
                tower.heal(target);
                if (target.towers === undefined)
                    target.towers = [];
                target.towers.push(tower.id);
                return;
            }
        }
        p.checkCPU('casualties', 0.5);
        if (TOWER_URGENT_REPAIR && Game.time % COOLDOWN.TOWER_URGENT_REPAIR === 0 && tower.room.structures.urgentRepairable.length > 0) {
            // urgent Repair
            let target = tower.room.structures.urgentRepairable[0];
            tower.repair(target);
            if (target.towers === undefined)
                target.towers = [];
            target.towers.push(tower.id);
            return;
        }
        p.checkCPU('urgentRepairable', 0.5);

        let closestHostile = tower.pos.findClosestByRange(tower.room.hostiles);
        if (closestHostile) {
            // Attack
            tower.attack(closestHostile);
        }
        p.checkCPU('closestHostile', 0.5);
        if ((TOWER_REPAIR && Game.time % COOLDOWN.TOWER_REPAIR === 0 && tower.room.structures.repairable.length > 0) && (tower.energy > (tower.energyCapacity * 0.8))) {
            // Repair
            let isAddable = target => (target.towers === undefined || target.towers.length === 0);
            let target = _.find(tower.room.structures.repairable, isAddable);
            if (!_.isUndefined(target)) {
                tower.repair(target);
                if (target.towers === undefined)
                    target.towers = [];
                target.towers.push(tower.id);
            }
        }
        p.checkCPU('repairable', 0.5);
    }
};
