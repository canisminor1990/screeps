import { CreepBehaviour } from '../Behaviour';

class MeleeBehaviour extends CreepBehaviour {
	constructor() {
		super('melee');
		this._invalidAction = this.invalidAction;
		this._run = this.run;
		this.setState({
			healing: {
				moveOptions: options => {
					options.respectRamparts = true;
					return options;
				},
			},
		});
		this.invalidAction = creep => {
			return (
				this._invalidAction(creep) ||
				(creep.action.name === 'guarding' &&
					(!creep.flag || creep.flag.pos.roomName === creep.pos.roomName || creep.leaveBorder()))
			);
		};
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
		return [CreepManager.action.defending, CreepManager.action.invading, CreepManager.action.guarding];
	};
}

export default new MeleeBehaviour();
