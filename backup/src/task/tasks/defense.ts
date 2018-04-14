// Defense task handles spotted invaders. Spawns defenders and gives them special behaviour.
export class DefenseTask {
	name = 'defense';
	creep = {
		defender: {
			fixedBody: [RANGED_ATTACK, MOVE],
			multiBody: {
				[HEAL]: 1,
				[MOVE]: 2,
				[RANGED_ATTACK]: 2,
				[TOUGH]: 1,
			},
			name: 'defender',
			behaviour: 'ranger',
		},
	};
	register = () => {};
	handleNewInvader = invaderCreep => {
		// ignore if on blacklist
		if (!SPAWN_DEFENSE_ON_ATTACK || DEFENSE_BLACKLIST.includes(invaderCreep.pos.roomName)) return;
		// if not our room and not our reservation

		if (!invaderCreep.room.my && !invaderCreep.room.reserved) {
			// if it is not our exploiting target
			let validColor = flagEntry =>
				Flag.compare(flagEntry, FLAG_COLOR.invade.exploit) || flagEntry.color === FLAG_COLOR.claim.color;
			let flag = Flag.find(validColor, invaderCreep.pos, true);

			if (!flag) return; // ignore invader
		}
		// check room threat balance
		if (invaderCreep.room.defenseLevel.sum > invaderCreep.room.hostileThreatLevel) {
			// room can handle that
		} else {
			// order a defender for each invader (if not happened yet)
			invaderCreep.room.hostiles.forEach(this.orderDefenses);
		}
	};
	handleGoneInvader = invaderId => {
		// check if invader died or in an other room (requires vision)
		let invader = Game.getObjectById(invaderId);
		if (!invader) {
			// Invader not found anymore
			// remove queued creeps
			let taskMemory = this.memory(invaderId);
			if (taskMemory && taskMemory.defender) {
				let defender = [];
				let removeQueued = entry => {
					let roomMemory = Memory.rooms[entry.spawnRoom];
					if (roomMemory && roomMemory.spawnQueueHigh) {
						let thisEntry = queued =>
							queued.destiny && queued.destiny.task === 'defense' && queued.destiny.invaderId === invaderId;
						let index = roomMemory.spawnQueueHigh.findIndex(thisEntry);
						if (index > -1) roomMemory.spawnQueueHigh.splice(index, 1);
					}
				};
				taskMemory.defender.forEach(removeQueued);
			}

			// cleanup task memory
			Task.clearMemory('defense', invaderId);
			// other existing creeps will recycle themself via nextAction (see below)
		}
	};
	handleCreepDied = creepName => {
		// check if its our creep
		let creepMemory = Memory.population[creepName];
		if (
			!creepMemory ||
			!creepMemory.destiny ||
			!creepMemory.destiny.task ||
			creepMemory.destiny.task !== 'defense' ||
			!creepMemory.destiny.invaderId
		)
			return;
		// check if the invader is still there
		let invader = Game.getObjectById(creepMemory.destiny.invaderId);
		if (!invader) return;

		// remove died creep from mem
		let taskMemory = this.memory(creepMemory.destiny.invaderId);
		if (taskMemory.defender) {
			let thisEntry = e => e.order === creepMemory.destiny.order;
			let index = taskMemory.defender.findIndex(thisEntry);
			if (index > -1) taskMemory.defender.splice(index, 1);
		}
		// order reinforements
		this.orderDefenses(invader);
	};
	memory = invaderId => {
		return Task.memory('defense', invaderId);
	};
	orderDefenses = invaderCreep => {
		let invaderId = invaderCreep.id;
		let remainingThreat = invaderCreep.threat;
		// check if an order has been made already
		let taskMemory = this.memory(invaderId);
		if (taskMemory.defender) {
			// defender creeps found. get defender threat
			let getThreat = entry => (remainingThreat -= entry.threat);
			taskMemory.defender.forEach(getThreat);
		} else {
			// No defender found.
			taskMemory.defender = [];
		}

		// analyze invader threat and create something bigger
		while (remainingThreat > 0) {
			let orderId = Util.guid();
			this.creep.defender.queue = invaderCreep.room.my ? 'High' : 'Medium';
			this.creep.defender.minThreat = remainingThreat * 1.1;

			let queued = Task.spawn(
				this.creep.defender,
				{
					// destiny
					task: 'defense',
					targetName: invaderId,
					invaderId: invaderId,
					spottedIn: invaderCreep.pos.roomName,
					order: orderId,
				},
				{
					// spawn room selection params
					targetRoom: invaderCreep.pos.roomName,
					maxRange: 4,
					minEnergyCapacity: 800,
					allowTargetRoom: true,
				},
				creepSetup => {
					// callback onQueued
					let memory = this.memory(invaderId);
					memory.defender.push({
						spawnRoom: creepSetup.queueRoom,
						order: creepSetup.destiny.order,
					});
					if (DEBUG)
						Util.logSystem(
							creepSetup.queueRoom,
							`Defender queued for hostile creep ${creepSetup.destiny.order} in ${creepSetup.destiny.spottedIn}`,
						);
				},
			);

			if (queued) {
				let bodyThreat = Creep.bodyThreat(queued.parts);
				remainingThreat -= bodyThreat;
			} else {
				// Can't spawn. Invader will not get handled!
				if (TRACE || DEBUG)
					trace(
						'Task',
						{ task: 'defense', invaderId: invaderId, targetRoom: invaderCreep.pos.roomName },
						'Unable to spawn. Invader will not get handled!',
					);
				return;
			}
		}
	};
	nextAction = creep => {
		// override behaviours nextAction function
		// this could be a global approach to manipulate creep behaviour

		// if spawning room is under attack defend there (=> defending)
		// if all invader gone, try to find original invaderById and travel there (=> travelling, defending)
		// else travel to ordering room (if no sight or invasion) (=> travelling, defending)
		// else check if there are other invaders nearby (=> travelling, defending)
		// if there is NO invader: recycle creep = travel to spawning room (or nearest), then recycling

		// defend current room
		if (
			Creep.action.defending.isValidAction(creep) &&
			Creep.action.defending.isAddableAction(creep) &&
			Creep.action.defending.assign(creep)
		) {
			return;
		}
		// travel to invader
		let invader = Game.getObjectById(creep.data.destiny.invaderId);
		if (invader && creep.pos.roomName === invader.pos.roomName) {
			Creep.action.travelling.assign(creep, invader);
			return;
		}
		// travel to initial calling room
		let callingRoom = Game.rooms[creep.data.destiny.spottedIn];
		if (!callingRoom || callingRoom.hostiles.length > 0) {
			return Creep.action.travelling.assignRoom(creep, creep.data.destiny.spottedIn);
		}
		// check adjacent rooms for invasion
		let hasHostile = roomName => Game.rooms[roomName] && Game.rooms[roomName].hostiles.length > 0;
		let invasionRoom = creep.room.adjacentRooms.find(hasHostile);
		if (invasionRoom) {
			return Creep.action.travelling.assignRoom(creep, invasionRoom);
		}
		// recycle self
		let mother = Game.spawns[creep.data.motherSpawn];
		if (mother) {
			Creep.action.recycling.assign(creep, mother);
		}
	};
}
