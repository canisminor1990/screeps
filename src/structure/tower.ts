import { Component } from '../class';

class StructureTowerConstructor extends Component {
	state = {};
	loop = (room: Room): void => {
		this.state = {
			hurtCreeps: room.hurtCreeps,
			urgentRepairable: room.structures.urgentRepairable,
			hostiles: room.hostiles,
			invasion: room.situation.invasion,
		};
		_.forEach(room.structures.towers, this.run);
	};

	run = (tower: StructureTower): void => {
		if (!tower) return;
		if (this.runHeal(tower, this.state.hurtCreeps, this.state.invasion) === OK) return;
		if (this.runRepair(tower, this.state.urgentRepairable) === OK) return;
		this.runAttack(tower, this.state.hostiles);
	};

	private runHeal = (tower, hurtCreeps, invasion) => {
		if (hurtCreeps.length === 0) return;
		// Heal
		let target = hurtCreeps[0];
		if (target.hitsMax - target.hits >= 400 || !invasion) {
			const callback = tower.heal(target);
			if (_.isUndefined(target.towers)) target.towers = [];
			target.towers.push(tower.id);
			return callback;
		}
	};
	private runRepair = (tower, urgentRepairable) => {
		if (urgentRepairable.length === 0) return;
		// urgent Repair
		let target = urgentRepairable[0];
		const callback = tower.repair(target);
		if (_.isUndefined(target.towers)) target.towers = [];
		target.towers.push(tower.id);
		return callback;
	};
	private runAttack = (tower, hostiles) => {
		if (hostiles.length === 0) return;
		// attack
		let closestHostile = tower.pos.findClosestByRange(hostiles) as Creep;
		if (closestHostile) return tower.attack(closestHostile);
	};
}

export default new StructureTowerConstructor();
