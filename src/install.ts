import { ProtoypeInstall } from './prototype';
import { TravelerInstall } from './traveler';
import { Install, getUsername } from './util';

export const install = () => {
	// Config
	Install('_ME', getUsername);
	Install(global, require('config'));

	// Util
	Install('Util', require('./util').default, {
		DiamondIterator: require('./util/diamond'),
		SpiralIterator: require('./util/spiral'),
	});

	// Load modules
	ProtoypeInstall();
	TravelerInstall();
	Install(global, require('./global'), {
		CMemory: require('./global/CMemory'),
		Population: require('./global/population'),
		Events: require('./global/events'),
	});

	// Flag
	Install(Flag, require('./flag/index').default);

	// Task
	Install('Task', require('./task').default, {
		guard: require('./task/tasks/guard').default,
		defense: require('./task/tasks/defense').default,
		mining: require('./task/tasks/mining').default,
		claim: require('./task/tasks/claim').default,
		reserve: require('./task/tasks/reserve').default,
		pioneer: require('./task/tasks/pioneer').default,
		attackController: require('./task/tasks/attackController').default,
		robbing: require('./task/tasks/robbing').default,
		reputation: require('./task/tasks/reputation').default,
		delivery: require('./task/tasks/delivery').default,
		labTech: require('./task/tasks/labTech').default,
		safeGen: require('./task/tasks/safeGen').default,
		scheduler: require('./task/tasks/scheduler').default,
	});

	// Creep
	Creep.Action = require('./creep/Action');
	Creep.Behaviour = require('./creep/Behaviour');
	Install((Creep.action = {}), {
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
	});
	Install((Creep.behaviour = {}), {
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
	});
	Install((Creep.setup = {}), {
		hauler: require('./creep/setup/hauler').default,
		healer: require('./creep/setup/healer').default,
		miner: require('./creep/setup/miner').default,
		mineralMiner: require('./creep/setup/mineralMiner').default,
		privateer: require('./creep/setup/privateer').default,
		upgrader: require('./creep/setup/upgrader').default,
		worker: require('./creep/setup/worker').default,
	});

	Install(Creep, require('./creep').default);

	// Room
	Install(Room, require('./room'), {
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

	// Structure
	Install(StructureTower, require('./structure/tower').default);
	Install(StructureSpawn, require('./structure/spawn').default);

	// Addon
	Install(global, {
		Grafana: GRAFANA ? require('./mod/grafana') : undefined,
		Visuals: require('./mod/visuals'),
	});

	if (DEBUG) Util.logSystem('Global.install', 'Code reloaded.');
	Install('isRoot', true);
};
