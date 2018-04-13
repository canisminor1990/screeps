// This task will react on labTech flags purple/white
import { TaskComponent } from '../../class/Task';

class LabTechTask extends TaskComponent {
	constructor() {
		super('labTech');
		this.creep = {
			labTech: {
				fixedBody: [WORK, CARRY, MOVE],
				multiBody: [CARRY, CARRY, MOVE],
				name: 'labTech',
				behaviour: 'labTech',
				queue: 'Low',
			},
		};
	}

	// hook into events
	register = () => {
		// when a new flag has been found (occurs every tick, for each flag)
		Flag.found.on(flag => this.handleFlagFound(flag));
		// a creep starts spawning
		Creep.spawningStarted.on(params => this.handleSpawningStarted(params));
		// a creep completed spawning
		Creep.spawningCompleted.on(creep => this.handleSpawningCompleted(creep));
		// a creep will die soon
		Creep.predictedRenewal.on(creep => this.handleCreepDied(creep.name));
		// a creep died
		Creep.died.on(name => this.handleCreepDied(name));
	};
	// for each flag
	handleFlagFound = flag => {
		// if it is a labTech flag
		if (flag.compareTo(FLAG_COLOR.labs.labTech) && Task.nextCreepCheck(flag, this.name)) {
			Util.set(flag.memory, 'task', this.name);
			// check if a new creep has to be spawned
			this.checkForRequiredCreeps(flag);
		}
	};
	// check if a new creep has to be spawned
	checkForRequiredCreeps = flag => {
		// get task memory
		const memory = this.memory(flag);
		// re-validate if too much time has passed
		Task.validateAll(memory, flag, this.name, { roomName: flag.pos.roomName, checkValid: true });
		// count creeps assigned to task
		const count = memory.queued.length + memory.spawning.length + memory.running.length;

		// if creep count below requirement spawn a new creep creep
		if (count < 1) {
			Task.spawn(
				this.creep.labTech, // creepDefinition
				{
					// destiny
					task: 'labTech', // taskName
					targetName: flag.name, // targetName
				},
				{
					// spawn room selection params
					targetRoom: flag.pos.roomName,
					minEnergyCapacity: 1000,
					maxRange: 1,
					allowTargetRoom: true,
				},
				creepSetup => {
					// callback onQueued
					let memory = this.memory(Game.flags[creepSetup.destiny.targetName]);
					memory.queued.push({
						room: creepSetup.queueRoom,
						name: creepSetup.name,
					});
				},
			);
		}
	};
	// when a creep starts spawning
	handleSpawningStarted = params => {
		// params: {spawn: spawn.name, name: creep.name, destiny: creep.destiny}
		// ensure it is a creep which has been queued by this task (else return)
		if (!params.destiny || !params.destiny.task || params.destiny.task != 'labTech') return;
		// get flag which caused queueing of that creep
		// TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
		let flag = Game.flags[params.destiny.targetName || params.destiny.flagName];
		if (flag) {
			// get task memory
			const memory = this.memory(flag);
			// save spawning creep to task memory
			memory.spawning.push(params);
			// clean/validate task memory queued creeps
			Task.validateQueued(memory, flag, this.name);
		}
	};
	// when a creep completed spawning
	handleSpawningCompleted = creep => {
		// ensure it is a creep which has been requested by this task (else return)
		if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != 'labTech') return;
		// get flag which caused request of that creep
		// TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
		let flag = Game.flags[creep.data.destiny.targetName || creep.data.destiny.flagName];
		if (flag) {
			// calculate & set time required to spawn and send next substitute creep
			// TODO: implement better distance calculation
			creep.data.predictedRenewal =
				creep.data.spawningTime + Util.routeRange(creep.data.homeRoom, flag.pos.roomName) * 50;

			// get task memory
			const memory = this.memory(flag);
			// save running creep to task memory
			memory.running.push(creep.name);

			// clean/validate task memory spawning creeps
			Task.validateSpawning(memory, flag, this.name);
		}
	};
	// when a creep died (or will die soon)
	handleCreepDied = name => {
		// get creep memory
		const mem = Memory.population[name];
		// ensure it is a creep which has been requested by this task (else return)
		if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'labTech') return;
		// get flag which caused request of that creep
		// TODO: remove  || creep.data.destiny.flagName (temporary backward compatibility)
		const flag = Game.flags[mem.destiny.targetName || mem.destiny.flagName];
		if (flag) {
			const memory = this.memory(flag);
			Task.validateRunning(memory, flag, this.name, { roomName: flag.pos.roomName, deadCreep: name });
		}
	};
	// get task memory
	memory = flag => {
		if (!flag.memory.tasks) flag.memory.tasks = {};
		if (!flag.memory.tasks.labTech) {
			flag.memory.tasks.labTech = {
				queued: [],
				spawning: [],
				running: [],
			};
		}
		return flag.memory.tasks.labTech;
	};
}

module.exports = new LabTechTask();
