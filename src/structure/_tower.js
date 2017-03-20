import config from '../config'
export default (tower) => {
    if (tower.energy > 0) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure => config.repair(structure)});
        (closestDamagedStructure) ? tower.repair(closestDamagedStructure) : null;
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        (closestHostile && closestHostile.owner != "Ruo" ) ? tower.attack(closestHostile) : null;
    }
}