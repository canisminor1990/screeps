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
		RoomManager.extend();
		FlagManager.extend();
		Task.extend();
		CreepManager.extend();
		CMemory.extend();
	};
	private fresh = () => {
		CPU.check('fresh');
		// Flush cache
		FlagManager.fresh();
		Population.fresh();
		RoomManager.fresh();
		Task.fresh();
		CreepManager.fresh();
		CMemory.fresh();
		CPU.end('fresh');
	};
	private analyze = () => {
		CPU.check('analyze', 'FlagManager');
		FlagManager.analyze();
		CPU.end('analyze', 'FlagManager');

		CPU.check('analyze', 'RoomManager');
		RoomManager.analyze();
		CPU.end('analyze', 'RoomManager');

		CPU.check('analyze', 'Population');
		Population.analyze();
		CPU.end('analyze', 'Population');
	};
	private register = () => {
		CPU.check('register', 'RoomManager');
		// Room event hooks must be registered before analyze for costMatrixInvalid
		RoomManager.register();
		CPU.end('register', 'RoomManager');

		this.analyze();
		// Register event hooks

		CPU.check('register', 'CreepManager');
		CreepManager.register();
		CPU.end('register', 'CreepManager');

		CPU.check('register', 'SpawnManager');
		SpawnManager.register();
		CPU.end('register', 'SpawnManager');

		CPU.check('register', 'Task');
		Task.register();
		CPU.end('register', 'Task');
	};
	private run = () => {
		CPU.check('run', 'Population');
		Population.run();
		CPU.end('run', 'Population');

		CPU.check('run', 'FlagManager');
		FlagManager.run();
		CPU.end('run', 'FlagManager');

		CPU.check('run', 'RoomManager');
		RoomManager.run();
		CPU.end('run', 'RoomManager');

		CPU.check('run', 'CreepManager');
		CreepManager.run();
		CPU.end('run', 'CreepManager');

		CPU.check('run', 'StructureSpawn');
		SpawnManager.run();
		CPU.end('run', 'StructureSpawn');

		CPU.check('run', 'Task');
		Task.run();
		CPU.end('run', 'Task');
	};
	private cleanup = () => {
		CPU.check('cleanup');
		FlagManager.cleanup();
		Population.cleanup();
		RoomManager.cleanup();
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
