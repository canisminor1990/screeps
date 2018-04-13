// This task will react on yellow/yellow flags, sending a guarding creep to the flags position.
import { TaskComponent } from '../../class/Task';

class GuardTask extends TaskComponent {
	constructor() {
		super('guard');
		this.minControllerLevel = 3;
		this.creep = {
			guard: {
				fixedBody: [RANGED_ATTACK, MOVE],
				multiBody: {
					[HEAL]: 1,
					[MOVE]: 2,
					[RANGED_ATTACK]: 2,
					[TOUGH]: 1,
				},
				name: 'guard',
				behaviour: 'ranger',
				queue: 'Low',
			},
		};
	}

	// for each flag
	handleFlagFound = flag => {
		// if it is a yellow/yellow flag
		if (flag.compareTo(FLAG_COLOR.defense) && Task.nextCreepCheck(flag, this.name)) {
			Util.set(flag.memory, 'task', this.name);
			// check if a new creep has to be spawned
			this.checkForRequiredCreeps(flag);
		}
	};
	// check if a new creep has to be spawned
	checkForRequiredCreeps = flag => {
		// get task memory
		let memory = this.memory(flag);
		// re-validate if too much time has passed
		Task.validateAll(memory, flag, this.name, { roomName: flag.pos.roomName, checkValid: true });
		// count creeps assigned to task
		let count = memory.queued.length + memory.spawning.length + memory.running.length;
		// if creep count below requirement spawn a new creep creep
		if (count < 1) {
			Task.spawn(
				this.creep.guard, // creepDefinition
				{
					// destiny
					task: 'guard', // taskName
					targetName: flag.name, // targetName
					flagName: flag.name, // custom
				},
				{
					// spawn room selection params
					targetRoom: flag.pos.roomName,
					minEnergyCapacity: 200,
					rangeRclRatio: 1.8, // stronger preference of higher RCL rooms
					allowTargetRoom: true,
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
		if (!params.destiny || !params.destiny.task || params.destiny.task != 'guard') return;
		// get flag which caused queueing of that creep
		let flag = Game.flags[params.destiny.flagName];
		if (flag) {
			// get task memory
			let memory = this.memory(flag);
			// save spawning creep to task memory
			memory.spawning.push(params);
			// clean/validate task memory queued creeps
			Task.validateQueued(memory, flag, this.name);
		}
	};
	// when a creep completed spawning
	handleSpawningCompleted = creep => {
		// ensure it is a creep which has been requested by this task (else return)
		if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != 'guard') return;
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
		if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'guard') return;
		// get flag which caused request of that creep
		let flag = Game.flags[mem.destiny.flagName];
		if (flag) {
			const memory = this.memory(flag);
			Task.validateRunning(memory, flag, this.name, { roomName: flag.pos.roomName, deadCreep: name });
		}
	};
	// get task memory
	memory = flag => {
		if (!flag.memory.tasks) flag.memory.tasks = {};
		if (!flag.memory.tasks.guard) {
			flag.memory.tasks.guard = {
				queued: [],
				spawning: [],
				running: [],
			};
		}
		return flag.memory.tasks.guard;
	};
}

module.exports = new GuardTask();
