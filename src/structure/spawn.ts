import { Component } from '../class';

class StructureSpawnClass extends Component {
	priorityHigh = [Creep.setup.worker, Creep.setup.miner, Creep.setup.hauler, Creep.setup.upgrader];
	priorityLow = [Creep.setup.mineralMiner, Creep.setup.privateer];
	extend = () => {};
	register = () => {
		Creep.spawningCompleted.on(creep => this.handleSpawningCompleted(creep));
	};
	handleSpawningCompleted = creep => {
		if (LOG_TRACE)
			Log.trace('Spawn', {
				behaviour: creep.data.creepType,
				creepName: creep.name,
				Spawn: 'Creep.spawningCompleted',
			});
		if (CENSUS_ANNOUNCEMENTS) Log.room(creep.pos.roomName, Dye(COLOR_GREEN, creep.name + ' was born!'));
	};
	run = () => {
		let run = spawn => {
			if (spawn.room.my) spawn.run();
		};
		_.forEach(Game.spawns, run);
	};
}

export default new StructureSpawnClass();
