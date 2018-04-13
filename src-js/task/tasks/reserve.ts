import { TaskComponent } from '../../class/Task';

// This task will react on exploit, reserve and remotemine flags, sending a reserving creep to the flags position.
class ReserveTask extends TaskComponent {
	constructor() {
		super('reserve');
		this.state = {
			default: this.default,
		};
		this.spawnRoomMaxRange = 6;
		this.creep = {
			reserver: {
				fixedBody: {
					[CLAIM]: 2,
					[MOVE]: 2,
				},
				multiBody: [CLAIM, MOVE],
				maxMulti: 7,
				name: 'reserver',
				behaviour: 'claimer',
			},
		};
	}

	private VALID_RESERVATION = 1000;
	private URGENT_RESERVATION = 250;

	default = {
		name: `default-${this.name}`,
		spawnParams: flag => {
			// :{count:number, priority:string}
			const params = { count: 0, queue: 'Low' }; // default to no spawn
			const hasFlag = !!flag;
			const hasController =
				hasFlag && (Room.isControllerRoom(flag.pos.roomName) || (flag.room && flag.room.controller));
			if (!hasFlag || !hasController) {
				if (DEBUG && TRACE)
					Util.trace('Task', {
						hasFlag,
						hasController,
						checkForRequiredCreeps: 'skipping room, missing flag or controller',
						[this.name]: 'checkForRequiredCreeps',
						Task: this.name,
					});
				return params;
			}
			if (flag.room) {
				flag.memory.lastVisible = Game.time;
				flag.memory.ticksToEnd = flag.room.controller.reservation && flag.room.controller.reservation.ticksToEnd;
				const validReservation =
					flag.room.controller.reservation &&
					(flag.room.controller.reservation.ticksToEnd > 1000 || flag.room.controller.reservation.username !== ME);
				const isOwned = !!flag.room.controller.owner;
				if (isOwned || validReservation) {
					if (DEBUG && TRACE)
						Util.trace('Task', {
							validReservation,
							isOwned,
							checkForRequiredCreeps: 'skipping room, reserved or owned',
							[this.name]: 'checkForRequiredCreeps',
							Task: this.name,
						});
					return params;
				}
				const urgent = !flag.room.controller.reservation || flag.room.controller.reservation.ticksToEnd < 250;
				params.count = 1;
				if (urgent) params.queue = 'Medium';
				if (DEBUG && TRACE) {
					const type = urgent ? 'urgent' : ' ';
					Util.trace('Task', {
						validReservation,
						isOwned,
						urgent,
						checkForRequiredCreeps: `sending${type}reserver`,
						[this.name]: 'checkForRequiredCreeps',
						Task: this.name,
					});
				}
			} else if (
				_.isUndefined(flag.memory.lastVisible) ||
				Game.time - flag.memory.lastVisible > (flag.memory.ticksToEnd - 250 || 250)
			) {
				params.count = 1;
				params.queue = 'Medium';
				if (DEBUG && TRACE)
					Util.trace('Task', {
						lastVisible: flag.memory.lastVisible,
						tickToEnd: flag.memory.ticksToEnd,
						checkForRequiredCreeps: 'sending urgent reserver, no visibility',
						[this.name]: 'checkForRequiredCreeps',
						Task: this.name,
					});
			}
			return params;
		},
	};
	// for each flag
	handleFlagFound = flag => {
		// if it is a reserve, exploit or remote mine flag
		if (
			(flag.compareTo(FLAG_COLOR.claim.reserve) ||
				flag.compareTo(FLAG_COLOR.invade.exploit) ||
				flag.compareTo(FLAG_COLOR.claim.mining)) &&
			(Room.isControllerRoom(flag.pos.roomName) || (flag.room && flag.room.controller))
		) {
			const memory = this.memory(flag);
			if (flag.room) {
				flag.memory.lastVisible = Game.time;
				flag.memory.ticksToEnd = flag.room.controller.reservation && flag.room.controller.reservation.ticksToEnd;
				const currCheck = _.get(flag.memory, ['nextCheck', this.name], Infinity);
				const nextCheck = Game.time + flag.memory.ticksToEnd - this.VALID_RESERVATION;
				if (nextCheck < currCheck && !memory.waitForCreeps) {
					const count = memory.queued.length + memory.spawning.length + memory.running.length;
					if (count === 0) {
						// and not currently spawning
						_.set(flag.memory, ['nextCheck', this.name], nextCheck);
					} else {
						memory.waitForCreeps = true;
					}
				}
			}
			if (Task.nextCreepCheck(flag, this.name)) {
				delete memory.waitForCreeps;
				Util.set(flag.memory, 'task', this.name);
				// check if a new creep has to be spawned
				this.checkForRequiredCreeps(flag);
			}
		}
	};
	// for each flag
	handleFlagFound = flag => {
		// if it is a reserve, exploit or remote mine flag
		if (
			(flag.compareTo(FLAG_COLOR.claim.reserve) ||
				flag.compareTo(FLAG_COLOR.invade.exploit) ||
				flag.compareTo(FLAG_COLOR.claim.mining)) &&
			(Room.isControllerRoom(flag.pos.roomName) || (flag.room && flag.room.controller))
		) {
			const memory = this.memory(flag);
			if (flag.room) {
				flag.memory.lastVisible = Game.time;
				flag.memory.ticksToEnd = flag.room.controller.reservation && flag.room.controller.reservation.ticksToEnd;
				const currCheck = _.get(flag.memory, ['nextCheck', this.name], Infinity);
				const nextCheck = Game.time + flag.memory.ticksToEnd - this.VALID_RESERVATION;
				if (nextCheck < currCheck && !memory.waitForCreeps) {
					const count = memory.queued.length + memory.spawning.length + memory.running.length;
					if (count === 0) {
						// and not currently spawning
						_.set(flag.memory, ['nextCheck', this.name], nextCheck);
					} else {
						memory.waitForCreeps = true;
					}
				}
			}
			if (Task.nextCreepCheck(flag, this.name)) {
				delete memory.waitForCreeps;
				Util.set(flag.memory, 'task', this.name);
				// check if a new creep has to be spawned
				this.checkForRequiredCreeps(flag);
			}
		}
	};
	// check if a new creep has to be spawned
	checkForRequiredCreeps = flag => {
		let spawnParams;
		if (flag.compareTo(FLAG_COLOR.claim.mining)) {
			spawnParams = Task.mining.state.reserve.spawnParams(flag);
		} else if (flag.compareTo(FLAG_COLOR.invade.exploit)) {
			spawnParams = this.state.default.spawnParams(flag);
			spawnParams.queue = 'Low'; // privateer reserve is always low queue
		} else {
			spawnParams = this.state.default.spawnParams(flag);
		}

		// get task memory
		let memory = this.memory(flag);
		// clean/validate task memory queued creeps
		Task.validateAll(memory, flag, this.name, {
			roomName: flag.pos.roomName,
			queues: ['Low', 'Medium'],
			checkValid: true,
		});

		// if low & creep in low queue => move to medium queue
		if (spawnParams.queue !== 'Low' && memory.queued.length == 1) {
			let spawnRoom = Game.rooms[memory.queued[0].room];
			let elevate = (entry, index) => {
				if (entry.targetName == memory.queued[0].targetName) {
					let spawnData = spawnRoom.spawnQueueLow.splice(index, 1);
					spawnRoom.spawnQueueMedium.push(spawnData);
					return true;
				}
				return false;
			};
			spawnRoom.spawnQueueLow.find(elevate);
		}

		// count creeps assigned to task
		let count = memory.queued.length + memory.spawning.length + memory.running.length;

		// if creep count below requirement spawn a new creep creep
		if (count < spawnParams.count) {
			this.creep.reserver.queue = spawnParams.queue;
			Task.spawn(
				this.creep.reserver, // creepDefinition
				{
					// destiny
					task: this.name, // taskName
					targetName: flag.name, // targetName
				},
				{
					// spawn room selection params
					targetRoom: flag.pos.roomName,
					minEnergyCapacity: 1300,
					maxRange: this.spawnRoomMaxRange,
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
	// params: {spawn: spawn.name, name: creep.name, destiny: creep.destiny}
	handleSpawningStarted = params => {
		// ensure it is a creep which has been queued by this task (else return)
		if (!params.destiny || !params.destiny.task || params.destiny.task != this.name) return;
		// get flag which caused queueing of that creep
		let flag = Game.flags[params.destiny.targetName];
		if (flag) {
			// get task memory
			let memory = this.memory(flag);
			// clean/validate task memory queued creeps
			Task.validateQueued(memory, flag, this.name, { queues: ['Low', 'Medium'] });
			// save spawning creep to task memory
			memory.spawning.push(params);
		}
	};
	// when a creep completed spawning
	handleSpawningCompleted = creep => {
		// ensure it is a creep which has been requested by this task (else return)
		if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != this.name) return;
		// get flag which caused request of that creep
		let flag = Game.flags[creep.data.destiny.targetName];
		if (flag) {
			// calculate & set time required to spawn and send next substitute creep
			// TODO: implement better distance calculation
			creep.data.predictedRenewal =
				creep.data.spawningTime + Util.routeRange(creep.data.homeRoom, flag.pos.roomName) * 50;
			// get task memory
			let memory = this.memory(flag);
			// clean/validate task memory spawning creeps
			Task.validateSpawning(memory, flag, this.name);
			// save running creep to task memory
			memory.running.push(creep.name);
		}
	};
	// when a creep died (or will die soon)
	handleCreepDied = name => {
		// get creep memory
		let mem = Memory.population[name];
		// ensure it is a creep which has been requested by this task (else return)
		if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != this.name) return;
		// get flag which caused request of that creep
		let flag = Game.flags[mem.destiny.targetName];
		if (flag) {
			const memory = this.memory(flag);
			Task.validateRunning(memory, flag, this.name, { roomName: flag.pos.roomName, deadCreep: name });
		}
	};
	nextAction = creep => {
		// override behaviours nextAction function
		// this could be a global approach to manipulate creep behaviour
		if (creep.data.destiny && creep.data.destiny.room !== creep.room.name) {
			// go to target room
			return Creep.action.travelling.assignRoom(creep, creep.data.destiny.room);
		}
		// Reserve if possible, if not (should be never) then recycle
		let priority = [Creep.action.reserving, Creep.action.recycling];
		//  console.log("bingo")
		for (var iAction = 0; iAction < priority.length; iAction++) {
			var action = priority[iAction];
			if (action.isValidAction(creep) && action.isAddableAction(creep) && action.assign(creep)) {
				break;
			}
		}
		if (DEBUG && TRACE)
			Util.trace('Task', {
				creepName: creep.name,
				nextAction: creep.action.name,
				[this.name]: 'nextAction',
				Task: this.name,
			});
	};
	// get task memory
	memory = flag => {
		const memory = Util.get(flag.memory, ['tasks', 'reserve'], {
			queued: [],
			spawning: [],
			running: [],
		});
		// temporary migration, remove if in dev
		delete memory.valid;
		return memory;
	};
}

export default new ReserveTask();
