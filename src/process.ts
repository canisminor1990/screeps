import { install } from './install';

class Process {
	public loop = () => {
		CPU.fresh();

		CPU.start('fresh');
		this.fresh();
		CPU.end('fresh');

		CPU.start('register');
		this.register();
		CPU.end('register');

		CPU.start('run');
		this.run();
		CPU.end('run');

		CPU.start('cleanup');
		this.cleanup();
		CPU.end('cleanup');

		CPU.start('addon');
		this.addon();
		CPU.end('addon');
	};
	public install = () => {
		install();
		this.extend();
	};
	private extend = () => {
		Room.extend();
		Flag.extend();
		Task.extend();
		Creep.extend();
		CMemory.extend();
	};
	private fresh = () => {
		// Flush cache
		Room.fresh();
		Flag.fresh();
		Task.fresh();
		Population.fresh();
		Creep.fresh();
		CMemory.fresh();
	};
	private analyze = () => {
		CPU.start('analyze');
		Flag.analyze();
		Room.analyze();
		Population.analyze();
		CPU.end('analyze');
	};
	private register = () => {
		// Room event hooks must be registered before analyze for costMatrixInvalid
		Room.register();
		this.analyze();
		// Register event hooks
		Task.register();
		Creep.register();
		StructureSpawn.register();
	};
	private run = () => {
		// Execution
		CPU.start('run', 'Room');
		Room.run();
		CPU.end('run', 'Room');

		CPU.start('run', 'Flag');
		Flag.run();
		CPU.end('run', 'Flag');

		CPU.start('run', 'Task');
		Task.run();
		CPU.end('run', 'Task');

		CPU.start('run', 'Population');
		Population.run();
		CPU.end('run', 'Population');

		CPU.start('run', 'Creep');
		Creep.run();
		CPU.end('run', 'Creep');

		CPU.start('run', 'StructureSpawn');
		StructureSpawn.run();
		CPU.end('run', 'StructureSpawn');
	};
	private cleanup = () => {
		Room.cleanup();
		Flag.cleanup();
		Population.cleanup();
		// must come last
		CMemory.cleanup();
	};
	private addon = () => {
		// Postprocessing
		if (SEND_STATISTIC_REPORTS) {
			if (!Memory.statistics || (Memory.statistics.tick && Memory.statistics.tick + TIME_REPORT <= Game.time)) {
				Statistics.run();
			}
			Util.processReports();
		}
		// Mod
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run();
		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
	};
}

export default new Process();
