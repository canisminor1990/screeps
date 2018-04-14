class Process {
	public run = () => {
		// loaded memory segments
		CMemory.processSegments();
		this.Flush();
		this.Register();
		this.Execution();
		this.Cleanup();
		this.Addon();
	};
	private Flush = () => {
		// Flush cache
		Events.flush();
		Flag.flush();
		Population.flush();
		Room.flush();
		Task.flush();
	};
	private Register = () => {
		// Room event hooks must be registered before analyze for costMatrixInvalid
		Room.register();

		// analyze environment, wait a tick if critical failure
		if (!Flag.analyze()) {
			Util.logError('Flag.analyze failed, waiting one tick to sync flags');
			return;
		}
		Room.analyze();
		Population.analyze();

		// Register event hooks
		Creep.register();
		StructureSpawn.register();
		Task.register();
	};
	private Execution = () => {
		// Execution
		Population.execute();
		Flag.execute();
		Room.execute();
		Creep.execute();
		StructureSpawn.execute();
		Task.execute();
	};
	private Cleanup = () => {
		Flag.cleanup();
		Population.cleanup();
		Room.cleanup();
		CMemory.cleanup(); // must come last
	};
	private Addon = () => {
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
