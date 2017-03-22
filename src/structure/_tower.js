import config from '../config'
import { isFriend } from '../_util'
export default (tower) => {
	if (tower.energy > 0) {
		const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure => config.repair(structure)});
		(closestDamagedStructure) ? tower.repair(closestDamagedStructure) : null;
		const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		(closestHostile && !isFriends(closestHostile.owner.username) ) ? tower.attack(closestHostile) : null;
	}
}