import { CreepBehaviour } from '../../class';

class MinerBehaviour extends CreepBehaviour {
	constructor() {
		super('miner');
	}

	actions = creep => {
		return [Creep.action.mining, Creep.action.recycling];
	};
}

export default new MinerBehaviour();
