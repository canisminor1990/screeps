import { install } from './install';

class Process {
	public loop = () => {
		CPU.fresh();

		CPU.check('fresh');
		this.fresh();
		CPU.end('fresh');

		CPU.check('register');
		this.register();
		CPU.end('register');

		CPU.check('run');
		this.run();
		CPU.end('run');

		CPU.check('cleanup');
		this.cleanup();
		CPU.end('cleanup');

		CPU.check('addon');
		this.addon();
		CPU.end('addon');

		CPU.handleData();
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
		CPU.check('analyze');
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
		CPU.check('run', 'Room');
		Room.run();
		CPU.end('run', 'Room');

		CPU.check('run', 'Flag');
		Flag.run();
		CPU.end('run', 'Flag');

		CPU.check('run', 'Task');
		Task.run();
		CPU.end('run', 'Task');

		CPU.check('run', 'Population');
		Population.run();
		CPU.end('run', 'Population');

		CPU.check('run', 'Creep');
		Creep.run();
		CPU.end('run', 'Creep');

		CPU.check('run', 'StructureSpawn');
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
