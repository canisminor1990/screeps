import { ProtoypeInstall } from './prototype';
import { TravelerInstall } from './traveler';
import { Install, getUsername } from './util';

export const install = () => {
	// Config
	Install('_ME', getUsername);
	Install(global, require('config'));

	// Util
	Install('Util', require('./util').default, {
		DiamondIterator: require('./util/iterator/diamond').default,
		SpiralIterator: require('./util/iterator/spiral').default,
	});

	// Load modules
	ProtoypeInstall();
	TravelerInstall();
	Install(global, require('./global').default, {
		CMemory: require('./global/CMemory').default,
		Population: require('./global/population').default,
	});

	// Flag
	Install(Flag, require('./flag/index').default);

	// Task
	Install('Task', require('./task').default, {
		guard: require('./task/type/guard').default,
		defense: require('./task/type/defense').default,
		mining: require('./task/type/mining').default,
		claim: require('./task/type/claim').default,
		reserve: require('./task/type/reserve').default,
		pioneer: require('./task/type/pioneer').default,
		attackController: require('./task/type/attackController').default,
		robbing: require('./task/type/robbing').default,
		reputation: require('./task/type/reputation').default,
		delivery: require('./task/type/delivery').default,
		labTech: require('./task/type/labTech').default,
		safeGen: require('./task/type/safeGen').default,
		scheduler: require('./task/type/scheduler').default,
	});

	// Creep
	Install(Creep, {
		Action: require('./class').CreepAction,
		Behaviour: require('./class').Behaviour,
		Setup: require('./class').CreepSetup,
	});
	Install((Creep.action = {}), {
		attackController: require('./creep/action/attackController').default,
		avoiding: require('./creep/action/avoiding').default,
		boosting: require('./creep/action/boosting').default,
		building: require('./creep/action/building').default,
		bulldozing: require('./creep/action/bulldozing').default,
		charging: require('./creep/action/charging').default,
		claiming: require('./creep/action/claiming').default,
		defending: require('./creep/action/defending').default,
		dismantling: require('./creep/action/dismantling').default,
		dropping: require('./creep/action/dropping').default,
		feeding: require('./creep/action/feeding').default,
		fortifying: require('./creep/action/fortifying').default,
		fueling: require('./creep/action/fueling').default,
		guarding: require('./creep/action/guarding').default,
		harvesting: require('./creep/action/harvesting').default,
		healing: require('./creep/action/healing').default,
		idle: require('./creep/action/idle').default,
		invading: require('./creep/action/invading').default,
		mining: require('./creep/action/mining').default,
		picking: require('./creep/action/picking').default,
		reallocating: require('./creep/action/reallocating').default,
		recycling: require('./creep/action/recycling').default,
		repairing: require('./creep/action/repairing').default,
		reserving: require('./creep/action/reserving').default,
		robbing: require('./creep/action/robbing').default,
		safeGen: require('./creep/action/safeGen').default,
		storing: require('./creep/action/storing').default,
		travelling: require('./creep/action/travelling').default,
		uncharging: require('./creep/action/uncharging').default,
		upgrading: require('./creep/action/upgrading').default,
		withdrawing: require('./creep/action/withdrawing').default,
	});
	Install((Creep.behaviour = {}), {
		claimer: require('./creep/behaviour/claimer').default,
		collapseWorker: require('./creep/behaviour/collapseWorker').default,
		hauler: require('./creep/behaviour/hauler').default,
		healer: require('./creep/behaviour/healer').default,
		labTech: require('./creep/behaviour/labTech').default,
		melee: require('./creep/behaviour/melee').default,
		miner: require('./creep/behaviour/miner').default,
		mineralMiner: require('./creep/behaviour/mineralMiner').default,
		remoteMiner: require('./creep/behaviour/remoteMiner').default,
		remoteHauler: require('./creep/behaviour/remoteHauler').default,
		remoteWorker: require('./creep/behaviour/remoteWorker').default,
		pioneer: require('./creep/behaviour/pioneer').default,
		privateer: require('./creep/behaviour/privateer').default,
		recycler: require('./creep/behaviour/recycler').default,
		ranger: require('./creep/behaviour/ranger').default,
		upgrader: require('./creep/behaviour/upgrader').default,
		worker: require('./creep/behaviour/worker').default,
		safeGen: require('./creep/behaviour/safeGen').default,
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
	Install(Room, require('./room').default, {
		manager: {
			construction: require('./room/manager/construction').default,
			containers: require('./room/manager/container').default,
			defense: require('./room/manager/defense').default,
			extensions: require('./room/manager/extension').default,
			labs: require('./room/manager/lab').default,
			links: require('./room/manager/link').default,
			nuker: require('./room/manager/nuker').default,
			observers: require('./room/manager/observer').default,
			orders: require('./room/manager/orders').default,
			power: require('./room/manager/power').default,
			resources: require('./room/manager/resources').default,
			spawns: require('./room/manager/spawn').default,
			towers: require('./room/manager/tower').default,
			fillRoomOrders: require('./room/manager/fillRoomOrders').default,
			boostProduction: require('./room/manager/boostProduction').default,
		},
	});

	// Structure
	Install(StructureTower, require('./structure/tower').default);
	Install(StructureSpawn, require('./structure/spawn').default);

	// Addon
	Install(global, {
		Grafana: GRAFANA ? require('./mod/grafana').default : undefined,
		Visuals: require('./mod/visuals').default,
	});

	// Install Done
	Install('isRoot', true);
	Util.logSystem('Global.install', 'Code reloaded.');
};
