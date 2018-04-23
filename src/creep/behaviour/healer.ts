import { CreepBehaviour } from '../Behaviour';

class HealerBehaviour extends CreepBehaviour {
	constructor() {
		super('healer');
		this._invalidAction = this.invalidAction;
		this.invalidAction = creep => {
			return this._invalidAction(creep) || creep.action.name === 'guarding';
		};
	}

	actions = creep => {
		return [Creep.action.healing, Creep.action.guarding];
	};
}

export default new HealerBehaviour();
