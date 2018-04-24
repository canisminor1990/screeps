import { CreepBehaviour } from '../Behaviour';

class MinerBehaviour extends CreepBehaviour {
	constructor() {
		super('miner');
	}

	actions = creep => {
		return [CreepManager.action.mining, CreepManager.action.recycling];
	};
}

export default new MinerBehaviour();
