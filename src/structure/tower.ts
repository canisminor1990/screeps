import { Component } from '../class';

class StructureTowerConstructor extends Component {
	loop = (room: Room): void => {
		const run = (tower: StructureTower) => this.run(tower);
		_.forEach(room.structures.towers, run);
	};
	run = (tower: StructureTower): void => {
		if (tower) {
			// TODO: convert to action pattern
			if (tower.room.casualties.length > 0) {
				// Heal
				let target = tower.room.casualties[0];
				if (target.hitsMax - target.hits >= 400 || !tower.room.situation.invasion) {
					tower.heal(target);
					if (target.towers === undefined) target.towers = [];
					target.towers.push(tower.id);
					return;
				}
			}
			if (tower.room.structures.urgentRepairable.length > 0) {
				// urgent Repair
				let target = tower.room.structures.urgentRepairable[0];
				tower.repair(target);
				if (target.towers === undefined) target.towers = [];
				target.towers.push(tower.id);
				return;
			}

			let closestHostile = tower.pos.findClosestByRange(tower.room.hostiles) as Creep;
			if (closestHostile) {
				// Attack
				tower.attack(closestHostile);
			}
		}
	};
}

export default new StructureTowerConstructor();
