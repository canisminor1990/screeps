// This task will react on Red/Cyan flags, sending a giant (RCL7 Req) claiming creep to the flags position.
import { TaskComponent } from '../Task';

class AttackControllerTask extends TaskComponent {
	constructor() {
		super('attackController');
		this.creep = {
			attackController: {
				fixedBody: [],
				multiBody: {
					[CLAIM]: 5,
					[MOVE]: 5,
				},
				minMulti: 1,
				maxMulti: 4,
				name: 'Atk-Contr',
				behaviour: 'claimer',
				queue: 'Low',
			},
		};
	}

	// for each flag
	handleFlagFound = flag => {
		// if it is a Green/Purple flag
		if (flag.compareTo(FLAG_COLOR.invade.attackController) && Task.nextCreepCheck(flag, this.name)) {
			Util.set(flag.memory, 'task', this.name);
			// check if a new creep has to be spawned
			this.checkForRequiredCreeps(flag);
		}
	};
	// check if a new creep has to be spawned
	checkForRequiredCreeps = flag => {
		const roomName = flag.pos.roomName;
		const room = Game.rooms[roomName];
		// get task memory
		let memory = this.memory(flag);
		// re-validate if too much time has passed
		Task.validateAll(memory, flag, this.name, { roomName, checkValid: true });
		// count creeps assigned to task
		let count = memory.queued.length + memory.spawning.length + memory.running.length;
		// if creep count below requirement spawn a new creep creep
		if (count < 1) {
			Task.spawn(
				this.creep.attackController, // creepDefinition
				{
					// destiny
					task: 'attackController', // taskName
					targetName: flag.name, // targetName
				},
				{
					// spawn room selection params
					targetRoom: flag.pos.roomName,
					minEnergyCapacity: 3250,
					maxRange: 5,
				},
				creepSetup => {
					// onQueued callback
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
		if (!params.destiny || !params.destiny.task || params.destiny.task != 'attackController') return;
		// get flag which caused queueing of that creep
		let flag = Game.flags[params.destiny.targetName];
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
		if (!creep.data || !creep.data.destiny || !creep.data.destiny.task || creep.data.destiny.task != 'attackController')
			return;
		// get flag which caused request of that creep
		let flag = Game.flags[creep.data.destiny.targetName];
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
		if (!mem || !mem.destiny || !mem.destiny.task || mem.destiny.task != 'attackController') return;
		// get flag which caused request of that creep
		let flag = Game.flags[mem.destiny.targetName];
		if (flag) {
			const memory = this.memory(flag);
			Task.validateRunning(memory, flag, this.name, {
				roomName: flag.pos.roomName,
				deadCreep: name,
			});
		}
	};
	// get task memory
	memory = flag => {
		if (!flag.memory.tasks) flag.memory.tasks = {};
		if (!flag.memory.tasks.attackController) {
			flag.memory.tasks.attackController = {
				queued: [],
				spawning: [],
				running: [],
			};
		}
		return flag.memory.tasks.attackController;
	};
	nextAction = creep => {
		// override behaviours nextAction function
		// this could be a global approach to manipulate creep behaviour

		// Attack, then claim, then recycle
		let priority = [CreepManager.action.attackController, CreepManager.action.recycling];
		for (let iAction = 0; iAction < priority.length; iAction++) {
			let action = priority[iAction];
			if (action.isValidAction(creep) && action.isAddableAction(creep) && action.assign(creep)) {
				return;
			}
		}
	};
}

export default new AttackControllerTask();
