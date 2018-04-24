import { CreepBehaviour } from '../Behaviour';

class SafeGenBehaviour extends CreepBehaviour {
	constructor() {
		super('safeGen');
	}
	actions = creep => {
		return [CreepManager.action.safeGen, CreepManager.action.recycling];
	};
}

export default new SafeGenBehaviour();
