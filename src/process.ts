import { install } from './install';

class Process {
	public loop = () => {
		CPU.fresh();
		this.fresh();
		this.register();
		this.run();
		this.cleanup();
		this.addon();
		CPU.handleData();
		// if (Game.time % 20 === 0) {
		// 	CPU.report()
		// 	CPU.stop()
		// 	CPU.start()
		// }
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
		CPU.check('fresh');
		// Flush cache
		Room.fresh();
		Flag.fresh();
		Task.fresh();
		Population.fresh();
		Creep.fresh();
		CMemory.fresh();
		CPU.end('fresh');
	};
	private analyze = () => {
		CPU.check('analyze', 'Flag');
		Flag.analyze();
		CPU.end('analyze', 'Flag');

		CPU.check('analyze', 'Room');
		Room.analyze();
		CPU.end('analyze', 'Room');

		CPU.check('analyze', 'Population');
		Population.analyze();
		CPU.end('analyze', 'Population');
	};
	private register = () => {
		CPU.check('register', 'Room');
		// Room event hooks must be registered before analyze for costMatrixInvalid
		Room.register();
		CPU.end('register', 'Room');

		this.analyze();
		// Register event hooks

		CPU.check('register', 'Task');
		Task.register();
		CPU.end('register', 'Task');

		CPU.check('register', 'Creep');
		Creep.register();
		CPU.end('register', 'Creep');

		CPU.check('register', 'StructureSpawn');
		StructureSpawn.register();
		CPU.end('register', 'StructureSpawn');
	};
	private run = () => {
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
		CPU.check('cleanup');
		Room.cleanup();
		Flag.cleanup();
		Population.cleanup();
		// must come last
		CMemory.cleanup();
		CPU.end('cleanup');
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
		CPU.check('addon', 'Visuals');
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run();
		CPU.end('addon', 'Visuals');

		CPU.check('run', 'Layout');
		if (AUTO_LAYOUT && Game.time % AUTO_LAYOUT_INTERVAL === 0) Layout.run();
		CPU.end('run', 'Layout');

		CPU.check('addon', 'Grafana');
		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
		CPU.end('addon', 'Grafana');
	};
}

export default new Process();
