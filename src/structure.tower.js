export default (tower) => {
    "use strict";
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => (structure.hits / structure.hitsMax) < 0.5 && structure.hits < 5000
    });

    if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
        tower.attack(closestHostile);
    }
}