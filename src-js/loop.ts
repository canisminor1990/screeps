const cpuAtLoad = Game.cpu.getUsed();
import { ProtoypeInstall } from './prototype';
import { TravelerInstall } from './traveler';
const Root = () => {
	global._ME = _(Game.rooms)
		.map('controller')
		.filter('my')
		.map('owner.username')
		.first();
	// Initialize global & parameters
	_.assign(global, require('./global/index'));
	_.assign(global, require('./config'));
	_.assign(Flag, require('./flag/index'));
	// Load modules
	_.assign(global, {
		CompressedMatrix: require('./traveler/compressedMatrix'),
		Population: require('./global/population'),
		Task: require('./task/index').default,
		Tower: require('./structure/tower'),
		Util: require('./util').default,
		Events: require('./global/events'),
		OCSMemory: require('./global/ocsMemory'),
		Grafana: GRAFANA ? require('./mod/grafana') : undefined,
		Visuals: require('./mod/visuals'),
	});
	_.assign(global.Util, {
		DiamondIterator: require('./util/diamond'),
		SpiralIterator: require('./util/spiral'),
	});
	_.assign(global.Task, {
		guard: require('./task/tasks/guard'),
		defense: require('./task/tasks/defense'),
		mining: require('./task/tasks/mining'),
		claim: require('./task/tasks/claim'),
		reserve: require('./task/tasks/reserve'),
		pioneer: require('./task/tasks/pioneer'),
		attackController: require('./task/tasks/attackController'),
		robbing: require('./task/tasks/robbing'),
		reputation: require('./task/tasks/reputation'),
		delivery: require('./task/tasks/delivery'),
		labTech: require('./task/tasks/labTech'),
		safeGen: require('./task/tasks/safeGen'),
		scheduler: require('./task/tasks/scheduler'),
	});
	Creep.Action = require('./creep/Action');
	Creep.Behaviour = require('./creep/Behaviour');
	Creep.Setup = require('./creep/Setup');
	_.assign(Creep, {
		action: {
			attackController: require('./creep/action/attackController'),
			avoiding: require('./creep/action/avoiding'),
			boosting: require('./creep/action/boosting'),
			building: require('./creep/action/building'),
			bulldozing: require('./creep/action/bulldozing'),
			charging: require('./creep/action/charging'),
			claiming: require('./creep/action/claiming'),
			defending: require('./creep/action/defending'),
			dismantling: require('./creep/action/dismantling'),
			dropping: require('./creep/action/dropping'),
			feeding: require('./creep/action/feeding'),
			fortifying: require('./creep/action/fortifying'),
			fueling: require('./creep/action/fueling'),
			guarding: require('./creep/action/guarding'),
			harvesting: require('./creep/action/harvesting'),
			healing: require('./creep/action/healing'),
			idle: require('./creep/action/idle'),
			invading: require('./creep/action/invading'),
			mining: require('./creep/action/mining'),
			picking: require('./creep/action/picking'),
			reallocating: require('./creep/action/reallocating'),
			recycling: require('./creep/action/recycling'),
			repairing: require('./creep/action/repairing'),
			reserving: require('./creep/action/reserving'),
			robbing: require('./creep/action/robbing'),
			storing: require('./creep/action/storing'),
			travelling: require('./creep/action/travelling'),
			uncharging: require('./creep/action/uncharging'),
			upgrading: require('./creep/action/upgrading'),
			withdrawing: require('./creep/action/withdrawing'),
			safeGen: require('./creep/action/safeGen'),
		},
		behaviour: {
			claimer: require('./creep/behaviour/claimer'),
			collapseWorker: require('./creep/behaviour/collapseWorker'),
			hauler: require('./creep/behaviour/hauler'),
			healer: require('./creep/behaviour/healer'),
			labTech: require('./creep/behaviour/labTech'),
			melee: require('./creep/behaviour/melee'),
			miner: require('./creep/behaviour/miner'),
			mineralMiner: require('./creep/behaviour/mineralMiner'),
			remoteMiner: require('./creep/behaviour/remoteMiner'),
			remoteHauler: require('./creep/behaviour/remoteHauler'),
			remoteWorker: require('./creep/behaviour/remoteWorker'),
			pioneer: require('./creep/behaviour/pioneer'),
			privateer: require('./creep/behaviour/privateer'),
			recycler: require('./creep/behaviour/recycler'),
			ranger: require('./creep/behaviour/ranger'),
			upgrader: require('./creep/behaviour/upgrader'),
			worker: require('./creep/behaviour/worker'),
			safeGen: require('./creep/behaviour/safeGen'),
		},
		setup: {
			hauler: require('./creep/setup/hauler'),
			healer: require('./creep/setup/healer'),
			miner: require('./creep/setup/miner'),
			mineralMiner: require('./creep/setup/mineralMiner'),
			privateer: require('./creep/setup/privateer'),
			upgrader: require('./creep/setup/upgrader'),
			worker: require('./creep/setup/worker'),
		},
	});
	_.assign(Creep, require('./creep/index'));
	_.assign(Room, require('./room/index'));
	_.assign(Room, {
		_ext: {
			construction: require('./room/construction'),
			containers: require('./room/container'),
			defense: require('./room/defense'),
			extensions: require('./room/extension'),
			labs: require('./room/lab'),
			links: require('./room/link'),
			nuker: require('./room/nuker'),
			observers: require('./room/observer'),
			orders: require('./room/orders'),
			power: require('./room/power'),
			resources: require('./room/resources'),
			spawns: require('./room/spawn'),
			towers: require('./room/tower'),
			fillRoomOrders: require('./room/fillRoomOrders'),
			boostProduction: require('./room/boostProduction'),
		},
	});
	_.assign(Spawn, require('./structure/spawn'));

	// Extend server objects
	// global.extend();
	ProtoypeInstall();
	Creep.extend();
	Room.extend();
	Spawn.extend();
	Flag.extend();
	Task.extend();
	// custom extend
	OCSMemory.activateSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, true);

	if (global.DEBUG) Util.logSystem('Global.install', 'Code reloaded.');

	TravelerInstall({
		exportTraveler: false,
		installTraveler: true,
		installPrototype: true,
		defaultStuckValue: TRAVELER_STUCK_TICKS,
		reportThreshold: TRAVELER_THRESHOLD,
	});

	global.isRoot = true;
};

let cpuAtFirstLoop;
export default () => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Root();
	try {
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

		Util.set(Memory, 'config', {});
		_.assign(global, { config: Memory.config }); // allow for shorthand access in console
		// ensure up to date parameters, override in memory
		_.assign(global, require('./config'));
		_.merge(global, config);

		// process loaded memory segments
		OCSMemory.processSegments();
		p.checkCPU('processSegments', PROFILING.ANALYZE_LIMIT);

		// Flush cache
		Events.flush();
		Flag.flush();
		Population.flush();
		Room.flush();
		Task.flush();
		// custom flush
		p.checkCPU('flush', PROFILING.FLUSH_LIMIT);

		// Room event hooks must be registered before analyze for costMatrixInvalid
		Room.register();

		// analyze environment, wait a tick if critical failure
		if (!Flag.analyze()) {
			logError('Flag.analyze failed, waiting one tick to sync flags');
			return;
		}
		p.checkCPU('Flag.analyze', PROFILING.ANALYZE_LIMIT);
		Room.analyze();
		p.checkCPU('Room.analyze', PROFILING.ANALYZE_LIMIT);
		Population.analyze();
		p.checkCPU('Population.analyze', PROFILING.ANALYZE_LIMIT);
		// custom analyze

		// Register event hooks
		Creep.register();
		Spawn.register();
		Task.register();
		// custom register
		p.checkCPU('register', PROFILING.REGISTER_LIMIT);

		// Execution
		Population.execute();
		p.checkCPU('population.execute', PROFILING.EXECUTE_LIMIT);
		Flag.execute();
		p.checkCPU('Flag.execute', PROFILING.EXECUTE_LIMIT);
		Room.execute();
		p.checkCPU('room.execute', PROFILING.EXECUTE_LIMIT);
		Creep.execute();
		p.checkCPU('creep.execute', PROFILING.EXECUTE_LIMIT);
		Spawn.execute();
		p.checkCPU('spawn.execute', PROFILING.EXECUTE_LIMIT);
		Task.execute();
		p.checkCPU('task.execute', PROFILING.EXECUTE_LIMIT);
		// custom execute

		// Postprocessing
		if (SEND_STATISTIC_REPORTS) {
			if (!Memory.statistics || (Memory.statistics.tick && Memory.statistics.tick + TIME_REPORT <= Game.time))
				require('./global/statistics').process();
			Util.processReports();
			p.checkCPU('Util.processReports', PROFILING.FLUSH_LIMIT);
		}
		Flag.cleanup();
		p.checkCPU('Flag.cleanup', PROFILING.FLUSH_LIMIT);
		Population.cleanup();
		p.checkCPU('Population.cleanup', PROFILING.FLUSH_LIMIT);
		Room.cleanup();
		p.checkCPU('Room.cleanup', PROFILING.FLUSH_LIMIT);
		// custom cleanup

		OCSMemory.cleanup(); // must come last
		p.checkCPU('OCSMemory.cleanup', PROFILING.ANALYZE_LIMIT);
		if (ROOM_VISUALS && !Memory.CPU_CRITICAL) Visuals.run(); // At end to correctly display used CPU.
		p.checkCPU('visuals', PROFILING.EXECUTE_LIMIT);

		if (GRAFANA && Game.time % GRAFANA_INTERVAL === 0) Grafana.run();
		p.checkCPU('grafana', PROFILING.EXECUTE_LIMIT);

		Game.cacheTime = Game.time;

		if (global.DEBUG && global.TRACE)
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
};
