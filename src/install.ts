import { ProtoypeInstall } from './prototype';
import { TravelerInstall } from './global/Traveler';
import { Install, getUsername } from './util';

export const install = () => {
	console.log(String.fromCodePoint(0x231b), 'Code Reloading ...');
	const cpuBeforeInstall = Game.cpu.getUsed();
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
		Rooms(name) {
			return Game.rooms[name];
		},
		Creeps(name) {
			return Game.creeps[name];
		},
		CPU: require('./global/Cpu').default,
		Dye: require('./global/Dye').default,
		Log: require('./global/Log').default,
		Statistics: require('./global/Statistics').default,
		PopManager: require('./manager/Pop').default,
		MemoryManager: require('./manager/Memory').default,
		FlagManager: require('./manager/Flag').default,
	});

	// TaskManager
	Install('TaskManager', require('./task').default, {
		guard: require('./task/extra/guard').default,
		defense: require('./task/extra/defense').default,
		mining: require('./task/extra/mining').default,
		claim: require('./task/extra/claim').default,
		reserve: require('./task/extra/reserve').default,
		pioneer: require('./task/extra/pioneer').default,
		attackController: require('./task/extra/attackController').default,
		robbing: require('./task/extra/robbing').default,
		reputation: require('./task/extra/reputation').default,
		delivery: require('./task/extra/delivery').default,
		labTech: require('./task/extra/labTech').default,
		safeGen: require('./task/extra/safeGen').default,
		scheduler: require('./task/extra/scheduler').default,
	});

	// CreepManager
	Install('CreepManager', require('./creep').default, {
		Action: require('./class').CreepAction,
		Behaviour: require('./class').Behaviour,
		Setup: require('./class').CreepSetup,
	});
	Install((CreepManager.action = {}), {
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
	Install((CreepManager.behaviour = {}), {
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
	Install((CreepManager.setup = {}), {
		hauler: require('./creep/setup/hauler').default,
		healer: require('./creep/setup/healer').default,
		miner: require('./creep/setup/miner').default,
		mineralMiner: require('./creep/setup/mineralMiner').default,
		privateer: require('./creep/setup/privateer').default,
		upgrader: require('./creep/setup/upgrader').default,
		worker: require('./creep/setup/worker').default,
	});

	// Room
	Install('RoomManager', require('./room').default, {
		extra: {
			construction: require('./room/extra/construction').default,
			containers: require('./room/extra/container').default,
			defense: require('./room/extra/defense').default,
			extensions: require('./room/extra/extension').default,
			labs: require('./room/extra/lab').default,
			links: require('./room/extra/link').default,
			nuker: require('./room/extra/nuker').default,
			observers: require('./room/extra/observer').default,
			orders: require('./room/extra/orders').default,
			power: require('./room/extra/power').default,
			resources: require('./room/extra/resources').default,
			spawns: require('./room/extra/spawn').default,
			towers: require('./room/extra/tower').default,
			fillRoomOrders: require('./room/extra/fillRoomOrders').default,
			boostProduction: require('./room/extra/boostProduction').default,
			boostCreep: require('./room/extra/boostCreep').default,
			layout: require('./room/extra/layout').default,
		},
	});

	Install(global, {
		SpawnManager: require('./manager/Spawn').default,
		TowerManager: require('./manager/Tower').default,
	});

	// Addon
	Install(global, {
		Layout: AUTO_LAYOUT ? require('./mod/Layout').default : undefined,
		Grafana: GRAFANA ? require('./mod/Grafana').default : undefined,
		Visuals: require('./mod/Visuals').default,
		Command: require('commands'),
	});

	// Install Done
	Install('isRoot', true);
	const cpuAfterInstall = Game.cpu.getUsed();
	Log.success('Root Done', Dye(COLOR_GREY, `cpu-cost:${(cpuAfterInstall - cpuBeforeInstall).toFixed(2)}`));
};
