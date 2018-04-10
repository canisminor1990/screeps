import { inject } from './util/global';
import { TravelerInstall } from './traveler';
import { ProtoypeInstall } from './prototype';

export const install = () => {
	ProtoypeInstall();
	// Load global & config
	inject(global, require('./global/index'));
	global._ME = _(Game.rooms)
		.map('controller')
		.filter('my')
		.map('owner.username')
		.first();
	_.assign(global, require('./config'));

	// Load modules
	_.assign(global, {
		CompressedMatrix: require('./traveler/compressedMatrix'),
		Population: require('./global/population'),
		FlagDir: require('./flag/flagDir'),
		Task: require('./task/index'),
		Tower: require('./global/tower'),
		Util: require('./util/index').default,
		Events: require('./flag/events'),
		OCSMemory: require('./memory/index'),
		Grafana: GRAFANA ? require('./mod/grafana') : undefined,
		Visuals: require('./mod/visuals'),
	});
	_.assign(global.Task, {
		guard: require('./task/guard'),
		defense: require('./task/defense'),
		mining: require('./task/mining'),
		claim: require('./task/claim'),
		reserve: require('./task/reserve'),
		pioneer: require('./task/pioneer'),
		attackController: require('./task/attackController'),
		robbing: require('./task/robbing'),
		reputation: require('./task/reputation'),
		delivery: require('./task/delivery'),
		labTech: require('./task/labTech'),
		safeGen: require('./task/safeGen'),
		scheduler: require('./task/scheduler'),
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
	inject(Creep, require('./creep/index'));
	inject(Room, require('./room/index'));
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
	inject(Spawn, require('./global/spawn'));

	// Extend server objects: global.extend();
	Creep.extend();
	Room.extend();
	Spawn.extend();
	FlagDir.extend();
	Task.populate();
	OCSMemory.activateSegment(MEM_SEGMENTS.COSTMATRIX_CACHE, true);
	TravelerInstall({
		exportTraveler: false,
		installTraveler: true,
		installPrototype: true,
		defaultStuckValue: TRAVELER_STUCK_TICKS,
		reportThreshold: TRAVELER_THRESHOLD,
	});
	global.isRoot = true;
	if (global.DEBUG) logSystem('Global.install', 'Code reloaded.');
};
