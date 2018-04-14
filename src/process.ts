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
		Creep.extend();
		Room.extend();
		Flag.extend();
		Task.extend();
		// custom extend
		CMemory.activateSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, true);
	};
	private fresh = () => {
		// loaded memory segments
		CMemory.processSegments();
		// Flush cache
		Events.fresh();
		Flag.fresh();
		Creep.fresh();
		Population.fresh();
		Room.fresh();
		Task.fresh();
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
		Creep.register();
		StructureSpawn.register();
		Task.register();
	};
	private run = () => {
		// Execution
		Population.run();
		Flag.run();
		Room.run();
		Creep.run();
		StructureSpawn.run();
		Task.run();
	};
	private cleanup = () => {
		Flag.cleanup();
		Population.cleanup();
		Room.cleanup();
		CMemory.cleanup(); // must come last
	};
	private addon = () => {
		// Postprocessing
		if (SEND_STATISTIC_REPORTS) {
			if (!Memory.statistics || (Memory.statistics.tick && Memory.statistics.tick + TIME_REPORT <= Game.time)) {
				require('./global/statistics').process();
			}
			Util.processReports();
		}
		// Mod
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run(); // At end to correctly display used CPU.
		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
	};
}

export default new Process();
