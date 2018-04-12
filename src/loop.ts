import { install } from './root';
import { wrapLoop } from './util/wrapLoop';

const cpuAtLoad = Game.cpu.getUsed();
let cpuAtFirstLoop: number;

export default wrapLoop(() => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;

	try {
		if (_.isUndefined(global.isRoot)) install();
		const totalUsage = Util.startProfiling('main', { startCPU: cpuAtLoop });
		const p = Util.startProfiling('main', { enabled: PROFILING.MAIN, startCPU: cpuAtLoop });
		p.checkCPU('deserialize memory', 5); // the profiler makes an access to memory on startup
		// let the cpu recover a bit above the threshold before disengaging to prevent thrashing
		Memory.CPU_CRITICAL = Memory.CPU_CRITICAL
			? Game.cpu.bucket < CRITICAL_BUCKET_LEVEL + CRITICAL_BUCKET_OVERFILL
			: Game.cpu.bucket < CRITICAL_BUCKET_LEVEL;
		if (!cpuAtFirstLoop) cpuAtFirstLoop = cpuAtLoop;
		// ensure required memory namespaces
		if (Memory.debugTrace === undefined) {
			Memory.debugTrace = { error: true, no: {} };
		}
		if (Memory.cloaked === undefined) {
			Memory.cloaked = {};
		}

		_.assign(global, require('./config'));

		// process loaded memory segments
		OCSMemory.processSegments();
		p.checkCPU('processSegments', PROFILING.ANALYZE_LIMIT);

		// Flush cache
		Events.flush();
		Flag.flush();
		Population.flush();
		Room.flush();
		Task.flush();
		p.checkCPU('flush', PROFILING.FLUSH_LIMIT);

		// Room event hooks must be registered before analyze for costMatrixInvalid
		Room.register();

		// analyze environment, wait a tick if critical failure
		if (!Flag.analyze()) {
			Util.logError('Flag.analyze failed, waiting one tick to sync flags');
			return;
		}
		p.checkCPU('Flag.analyze', PROFILING.ANALYZE_LIMIT);
		Room.analyze();
		p.checkCPU('Room.analyze', PROFILING.ANALYZE_LIMIT);
		Population.analyze();
		p.checkCPU('Population.analyze', PROFILING.ANALYZE_LIMIT);

		// Register event hooks
		Creep.register();
		Spawn.register();
		Task.register();
		p.checkCPU('register', PROFILING.REGISTER_LIMIT);

		// Execution
		Population.execute();
		p.checkCPU('population.execute', PROFILING.EXECUTE_LIMIT);
		Flag.execute();
		p.checkCPU('flagDir.execute', PROFILING.EXECUTE_LIMIT);
		Room.execute();
		p.checkCPU('room.execute', PROFILING.EXECUTE_LIMIT);
		Creep.execute();
		p.checkCPU('creep.execute', PROFILING.EXECUTE_LIMIT);
		Spawn.execute();
		p.checkCPU('spawn.execute', PROFILING.EXECUTE_LIMIT);
		Task.execute();
		p.checkCPU('task.execute', PROFILING.EXECUTE_LIMIT);

		// Postprocessing
		if (SEND_STATISTIC_REPORTS) {
			if (!Memory.statistics || (Memory.statistics.tick && Memory.statistics.tick + TIME_REPORT <= Game.time))
				require('./memory/statistics').process();
			Util.processReports();
			p.checkCPU('processReports', PROFILING.FLUSH_LIMIT);
		}
		Flag.cleanup();
		p.checkCPU('Flag.cleanup', PROFILING.FLUSH_LIMIT);
		Population.cleanup();
		p.checkCPU('Population.cleanup', PROFILING.FLUSH_LIMIT);
		Room.cleanup();
		p.checkCPU('Room.cleanup', PROFILING.FLUSH_LIMIT);

		OCSMemory.cleanup(); // must come last
		p.checkCPU('OCSMemory.cleanup', PROFILING.ANALYZE_LIMIT);
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run(); // At end to correctly display used CPU.
		p.checkCPU('visuals', PROFILING.EXECUTE_LIMIT);

		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
		p.checkCPU('grafana', PROFILING.EXECUTE_LIMIT);

		Game.cacheTime = Game.time;

		if (DEBUG && TRACE)
			Util.trace('main', {
				cpuAtLoad,
				cpuAtFirstLoop,
				cpuAtLoop,
				cpuTick: Game.cpu.getUsed(),
				isNewServer: global.isNewServer,
				lastServerSwitch: Game.lastServerSwitch,
				main: 'cpu',
			});
		totalUsage.totalCPU();
	} catch (e) {
		Util.logError(e.stack || e.message);
	}
});
