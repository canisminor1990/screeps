import { install } from './install';

class Process {
	public loop = () => {
		this.fresh();
		this.register();
		this.run();
		this.cleanup();
		this.addon();
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
		Flag.analyze();
		Room.analyze();
		Population.analyze();
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
		Room.run();
		Flag.run();
		Task.run();
		Population.run();
		Creep.run();
		StructureSpawn.run();
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
			if (
				!Memory.statistics ||
				(Memory.statistics.tick && Memory.statistics.tick + TIME_REPORT <= Game.time)
			) {
				require('./global/statistics').process();
			}
			Util.processReports();
		}
		// Mod
		// At end to correctly display used CPU.
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run();
		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
	};
}

export default new Process();
