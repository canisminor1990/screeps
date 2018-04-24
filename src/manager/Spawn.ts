import { Component } from '../class';

class SpawnConstructor extends Component {
	priorityHigh = [
		CreepManager.setup.worker,
		CreepManager.setup.miner,
		CreepManager.setup.hauler,
		CreepManager.setup.upgrader,
	];
	priorityLow = [CreepManager.setup.mineralMiner, CreepManager.setup.privateer];
	register = () => {
		CreepManager.spawningCompleted.on((creep: Creep) => this.handleSpawningCompleted(creep));
	};
	handleSpawningCompleted = (creep: Creep) => {
		if (LOG_TRACE)
			Log.trace('Spawn', {
				behaviour: creep.data.creepType,
				creepName: creep.name,
				Spawn: 'CreepManager.spawningCompleted',
			});
		if (CENSUS_ANNOUNCEMENTS) Log.room(creep.pos.roomName, Dye(COLOR_GREEN, Util.emoji.tick, creep.name, 'was born!'));
	};
	run = () => {
		let run = (spawn: StructureSpawn) => {
			if (spawn.room.my) spawn.run();
		};
		_.forEach(Game.spawns, run);
	};
}

export default new SpawnConstructor();
