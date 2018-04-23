import { CreepBehaviour } from '../Behaviour';

class MineralMinerBehaviour extends CreepBehaviour {
	constructor() {
		super('mineralMiner');
		this.setState({
			mining: {
				newTarget: creep => {
					const notOccupied = source => {
						const hasThisSource = data => data.creepName !== creep.name && data.determinatedTarget === source.id;
						return !_.find(Memory.population, hasThisSource);
					};
					return _.find(creep.room.minerals, notOccupied);
				},
			},
		});
	}

	actions = creep => {
		return Creep.behaviour.miner.actions(creep);
	};
	getEnergy = creep => {
		return Creep.behaviour.miner.getEnergy(creep);
	};
	maintain = creep => {
		return Creep.behaviour.miner.maintain(creep);
	};
}

export default new MineralMinerBehaviour();
