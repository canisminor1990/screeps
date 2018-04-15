// This task will react on pioneer flags - 4 for Green/White, 1 for Green/Red
import { TaskComponent } from '../../class/Task';

class PioneerTask extends TaskComponent {
	constructor() {
		super('pioneer');
		this.creep = {
			pioneer: {
				fixedBody: {
					[CARRY]: 2,
					[MOVE]: 2,
					[WORK]: 2,
				},
				multiBody: [WORK, MOVE, CARRY],
				name: 'pioneer',
				behaviour: 'pioneer',
				queue: 'Low',
			},
			worker: {
				fixedBody: [MOVE, CARRY, WORK],
				behaviour: 'collapseWorker',
				queue: 'High',
			},
		};
	}

	handleRoomDied = room => {
		const recoveryType = 'collapseWorker';

		if (room.population && room.population.typeCount[recoveryType]) {
			return;
		}

		// try to spawn a worker
		let pioneer = true;
		if (room.energyAvailable > 199) {
			// fresh high queue
			room.spawnQueueHigh.splice(0, room.spawnQueueHigh.length);
			const definition = this.creep.worker;
			pioneer = !Task.spawn(
				definition, // creepDefinition
				{
					// destiny
					task: recoveryType, // taskName
					targetName: room.name, // targetName
					type: definition.behaviour,
				},
				{
					// spawn room selection params
					explicit: room.name,
				},
			);
		}
		if (pioneer) {
			// ensure room has a pioneer flag
			let flag = Flag.find(FLAG_COLOR.claim.pioneer, room);
			if (!flag) {
				room.newFlag(FLAG_COLOR.claim.pioneer);
			}
		}
	};
	// for each flag
	handleFlagFound = flag => {
		// if it is a pioneer single or spawn
		if (flag.compareTo(FLAG_COLOR.claim.pioneer) && Task.nextCreepCheck(flag, this.name)) {
			Util.set(flag.memory, 'task', this.name);
			// check if a new creep has to be spawned
			this.checkForRequiredCreeps(flag);
		}
	};
	// check if a new creep has to be spawned
	checkForRequiredCreeps = flag => {
		// only when room is owned
		if (!flag || (flag.room && !flag.room.my && !flag.room.reserved)) {
			if (!PIONEER_UNOWNED) {
				return console.log('Pioneer room not owned', Util.stack());
			}
			const owner = flag.room.owner || flag.room.reservation;
			if (owner && !Task.reputation.isAlly(owner)) {
				return Util.logError(`Pioneer target room owned by ${owner}`);
			}
		}

		// get task memory
		let memory = this.memory(flag);

		// re-validate if too much time has passed in the queue
		Task.validateAll(memory, flag, this.name, {
			roomName: flag.pos.roomName,
			subKey: 'pioneer',
			checkValid: true,
		});

		// decide number of pioneers required
		let count = memory.queued.length + memory.spawning.length + memory.running.length;

		// count creeps assigned to task
		// if creep count below requirement spawn a new creep creep
		if (count < 1) {
			const definition = this.creep.pioneer;
			Task.spawn(
				definition, // creepDefinition
				{
					// destiny
					task: 'pioneer', // taskName
					targetName: flag.name, // targetName
					flagName: flag.name, // custom
					type: definition.behaviour,
				},
				{
					// spawn room selection params
					targetRoom: flag.pos.roomName,
					minEnergyCapacity: 400, // weight of fixedBody
					rangeRclRatio: 2, // stronger preference of higher RCL rooms
				},
				creepSetup => {
					// callback onQueued
					let memory = this.memory(Game.flags[creepSetup.destiny.targetName]);
					memory.queued.push({
						room: creepSetup.queueRoom,
						name: creepSetup.name,
						targetName: flag.name,
					});
				},
			);
		}
	};
	// when a creep starts spawning
	handleSpawningStarted = params => {
		// params: {spawn: spawn.name, name: creep.name, destiny: creep.destiny}
		// ensure it is a creep which has been queued by this task (else return)
		if (!params.destiny || !params.destiny.task || params.destiny.task != 'pioneer') return;
		// get flag which caused queueing of that creep
		let flag = Game.flags[params.destiny.flagName];
		if (flag) {
			// get task memory
			let memory = this.memory(flag);
			// save spawning creep to task memory
			memory.spawning.push(params);

			// clean/validate task memory queued creeps
			const type = params.destiny.type;
			// default to both as temporary migration
			const priority = type ? _.find(this.creep, { behaviour: type }).queue : ['Low', 'High'];
			Task.validateQueued(memory, flag, this.name, { queues: [priority] });
		}
	};
	// when a creep completed spawning
	handleSpawningCompleted = creep => {
		// ensure it is a creep which has been requested by this task (else return)
		if (
			!creep.data ||
			!creep.data.destiny ||
			!creep.data.destiny.task ||
			creep.data.destiny.task != 'pioneer'
		)
			return;
		// get flag which caused request of that creep
		let flag = Game.flags[creep.data.destiny.flagName];
		if (flag) {
			// calculate & set time required to spawn and send next substitute creep
			// TODO: implement better distance calculation
			creep.data.predictedRenewal =
				creep.data.spawningTime + Util.routeRange(creep.data.homeRoom, flag.pos.roomName) * 50;

			// get task memory
			let memory = this.memory(flag);
			// save running creep to task memory
			memory.running.push(creep.name);
			// clean/validate task memory spawning creeps
			Task.validateSpawning(memory, flag, this.name);
		}
	};
	// when a creep died (or will die soon)
	handleCreepDied = name => {
		// get creep memory
		let mem = Memory.population[name];
		// ensure it is a creep which has been requested by this task (else return)
		if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'pioneer') return;
		// get flag which caused request of that creep
		let flag = Game.flags[mem.destiny.flagName];
		if (flag) {
			let memory = this.memory(flag);
			Task.validateRunning(memory, flag, this.name, {
				roomName: flag.pos.roomName,
				deadCreep: name,
			});
		}
	};
	// get task memory
	memory = flag => {
		if (!flag.memory.tasks) flag.memory.tasks = {};
		if (!flag.memory.tasks.pioneer) {
			flag.memory.tasks.pioneer = {
				queued: [],
				spawning: [],
				running: [],
			};
		}
		return flag.memory.tasks.pioneer;
	};
}

export default new PioneerTask();
