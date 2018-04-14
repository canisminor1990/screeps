import { Component } from '../class';

class StructureSpawnClass extends Component {
	priorityHigh = [Creep.setup.worker, Creep.setup.miner, Creep.setup.hauler, Creep.setup.upgrader];
	priorityLow = [Creep.setup.mineralMiner, Creep.setup.privateer];
	extend = () => {};
	register = () => {
		Creep.spawningCompleted.on(creep => this.handleSpawningCompleted(creep));
	};
	handleSpawningCompleted = creep => {
		if (DEBUG && TRACE)
			Util.trace('Spawn', { behaviour: creep.data.creepType, creepName: creep.name, Spawn: 'Creep.spawningCompleted' });
		if (CENSUS_ANNOUNCEMENTS)
			Util.logSystem(creep.pos.roomName, Util.dye(CRAYON.birth, 'Off to work ' + creep.name + '!'));
	};
	execute = () => {
		let run = spawn => {
			if (spawn.room.my) spawn.execute();
		};
		_.forEach(Game.spawns, run);
	};
}

export default new StructureSpawnClass();
