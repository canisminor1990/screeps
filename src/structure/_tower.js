export default (tower) => {
	const needFix = tower.room.memory.structures.needFix,
	      enemy   = tower.room.memory.creeps.enemy;
	if (enemy.length > 0) {
		tower.attack(enemy[0])
	} else if (needFix.length > 0) {
		tower.repair(needFix[0])
	}
}