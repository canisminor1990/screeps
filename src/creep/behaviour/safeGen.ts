import { CreepBehaviour } from '../../class';

class SafeGenBehaviour extends CreepBehaviour {
	constructor() {
		super('safeGen');
	}
	actions = creep => {
		return [Creep.action.safeGen, Creep.action.recycling];
	};
}

export default new SafeGenBehaviour();
