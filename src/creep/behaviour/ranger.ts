import { CreepBehaviour } from '../Behaviour';

class RangerBehaviour extends CreepBehaviour {
	constructor() {
		super('ranger');
		this._run = this.run;
		this.setState({
			healing: {
				moveOptions: options => {
					options.respectRamparts = true;
					return options;
				},
			},
		});
		this.run = creep => {
			creep.flee = creep.flee || !creep.hasActiveBodyparts([ATTACK, RANGED_ATTACK]);
			creep.attacking = false;
			creep.attackingRanged = false;
			this._run(creep);
			this.heal(creep);
		};
	}

	heal = creep => {
		if (!creep.attacking && creep.data.body.heal !== undefined && creep.hits < creep.hitsMax) {
			creep.heal(creep);
		}
	};
	actions = creep => {
		return [Creep.action.defending, Creep.action.healing, Creep.action.invading, Creep.action.guarding];
	};
}

export default new RangerBehaviour();
