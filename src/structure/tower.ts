import { Component } from '../class';

class StructureTowerConstructor extends Component {
	loop = (room: Room): void => {
		const run = (tower: StructureTower) => this.run(tower);
		_.forEach(room.structures.towers, run);
	};
	run = (tower: StructureTower): void => {
		if (tower) {
			// TODO: convert to action pattern
			const room = tower.room;
			const casualties = room.casualties;
			if (casualties.length > 0) {
				// Heal
				let target = casualties[0];
				if (target.hitsMax - target.hits >= 400 || !room.situation.invasion) {
					tower.heal(target);
					if (_.isUndefined(target.towers)) target.towers = [];
					target.towers.push(tower.id);
					return;
				}
			}
			const urgentRepairable = room.structures.urgentRepairable;
			if (urgentRepairable.length > 0) {
				// urgent Repair
				let target = urgentRepairable[0];
				tower.repair(target);
				if (_.isUndefined(target.towers)) target.towers = [];
				target.towers.push(tower.id);
				return;
			}

			const hostiles = room.hostiles;
			if (hostiles.length > 0) {
				// attack
				let closestHostile = tower.pos.findClosestByRange(room.hostiles) as Creep;
				if (closestHostile) tower.attack(closestHostile);
			}
		}
	};
}

export default new StructureTowerConstructor();
