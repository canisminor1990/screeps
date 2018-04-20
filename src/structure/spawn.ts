import { Component } from '../class';

class StructureSpawnConstructor extends Component {
	priorityHigh = [Creep.setup.worker, Creep.setup.miner, Creep.setup.hauler, Creep.setup.upgrader];
	priorityLow = [Creep.setup.mineralMiner, Creep.setup.privateer];
	register = () => {
		Creep.spawningCompleted.on((creep: Creep) => this.handleSpawningCompleted(creep));
	};
	handleSpawningCompleted = (creep: Creep) => {
		if (LOG_TRACE)
			Log.trace('Spawn', {
				behaviour: creep.data.creepType,
				creepName: creep.name,
				Spawn: 'Creep.spawningCompleted',
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

export default new StructureSpawnConstructor();
