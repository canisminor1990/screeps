import { CreepBehaviour } from '../Behaviour';

class PrivateerBehaviour extends CreepBehaviour {
	constructor() {
		super('privateer');
		this._invalidAction = this.invalidAction;
		this._run = this.run;
		this.setState({
			withdrawing: {
				name: `withdrawing-${this.name}`,
				isValidAction: creep => {
					return false;
				},
			},
		});
		this.invalidAction = creep => {
			return this._invalidAction(creep) || !creep.flag;
		};
		this.run = creep => {
			this._run(creep);
			if (creep.hits < creep.hitsMax && (!creep.action || creep.action.name !== 'travelling')) {
				// creep injured. move to next owned room
				if (creep.data) {
					if (!creep.data.nearestHome || !Game.rooms[creep.data.nearestHome]) {
						const nearestSpawnRoom = RoomManager.bestSpawnRoomFor(creep.pos.roomName);
						if (nearestSpawnRoom) {
							creep.data.nearestHome = nearestSpawnRoom.name;
						}
					}
					if (creep.data.nearestHome) {
						CreepManager.action.travelling.assignRoom(creep, creep.data.nearestHome);
					}
				}
			}
			if (LOG_TRACE)
				Log.trace('Behaviour', {
					creepName: creep.name,
					run: (creep.action && creep.action.name) || 'none',
					[this.name]: 'run',
					Behaviour: this.name,
				});
		};
	}

	nextAction = creep => {
		let carrySum = creep.sum;
		// at home
		if (creep.pos.roomName == creep.data.homeRoom) {
			// carrier filled
			if (carrySum > 0) {
				let deposit = []; // deposit energy in...
				// links?
				if (creep.carry.energy == carrySum) deposit = creep.room.structures.links.privateers;
				// storage?
				if (creep.room.storage) deposit.push(creep.room.storage);
				// containers?
				if (creep.room.structures.container) deposit = deposit.concat(creep.room.structures.container.privateers);
				// Choose the closest
				if (deposit.length > 0) {
					let target = creep.pos.findClosestByRange(deposit);
					if (target.structureType === STRUCTURE_STORAGE && this.assignAction(creep, 'storing', target)) return;
					else if (this.assignAction(creep, 'charging', target)) return;
				}
				// if( CreepManager.action.storing.assign(creep) ) return;
				if (this.assignAction(creep, 'charging')) return;
				if (!creep.room.ally && this.assignAction(creep, 'storing')) return;
				CreepManager.behaviour.worker.nextAction(creep);
				return;
			}
			// empty
			// travelling
			if (this.exploitNextRoom(creep)) {
			} else {
				// no new flag
				// behave as worker
				CreepManager.behaviour.worker.nextAction(creep);
			}
		} else {
			// not at home
			// at target room
			if (creep.flag && creep.flag.pos.roomName == creep.pos.roomName) {
				// check invader/cloaking state
				if (creep.room.situation.invasion && !creep.flag.compareTo(FLAG_COLOR.invade.robbing)) {
					creep.flag.cloaking = 50; // TODO: set to Infinity & release when solved
					this.exploitNextRoom(creep);
					return;
				}

				// get some energy
				if (creep.sum < creep.carryCapacity * 0.4) {
					// sources depleted
					if (creep.room.sourceEnergyAvailable === 0) {
						// cloak flag
						creep.flag.cloaking = _.max([creep.room.ticksToNextRegeneration - 20, 0]); // approach a bit earlier
						// travelling
						this.exploitNextRoom(creep);
					} else {
						// energy available
						// harvesting or picking
						let actions = [
							CreepManager.action.dismantling,
							CreepManager.action.picking,
							CreepManager.action.robbing,
							CreepManager.action.harvesting,
						];
						// TODO: Add extracting (if extractor present) ?
						for (let iAction = 0; iAction < actions.length; iAction++) {
							let action = actions[iAction];
							if (action.isValidAction(creep) && action.isAddableAction(creep) && action.assign(creep)) return;
						}
						// no targets in current room
						creep.flag.cloaking = 50;
						this.exploitNextRoom(creep);
					}
				} else {
					// carrier full
					const actions = [CreepManager.action.building];
					for (let iAction = 0; iAction < actions.length; iAction++) {
						let action = actions[iAction];
						if (action.isValidAction(creep) && action.isAddableAction(creep) && action.assign(creep)) return;
					}
					Population.registerCreepFlag(creep, null);
					CreepManager.action.travelling.assignRoom(creep, creep.data.homeRoom);
				}
			} else {
				// not at target room
				this.exploitNextRoom(creep);
			}
		}
	};
	exploitNextRoom = creep => {
		if (creep.sum < creep.carryCapacity * 0.4) {
			// calc by distance to home room
			const validColor = flagEntry =>
				FlagManager.compare(flagEntry, FLAG_COLOR.invade.exploit) ||
				FlagManager.compare(flagEntry, FLAG_COLOR.invade.robbing);
			const flag = FlagManager.find(
				validColor,
				new RoomPosition(25, 25, creep.data.homeRoom),
				false,
				FlagManager.exploitMod,
				creep.name,
			);
			// new flag found
			if (flag) {
				// travelling
				if (CreepManager.action.travelling.assignRoom(creep, flag.pos.roomName)) {
					Population.registerCreepFlag(creep, flag);
					return true;
				}
			}
		}
		// no new flag
		// go home
		Population.registerCreepFlag(creep, null);
		if (creep.room.name !== creep.data.homeRoom) {
			CreepManager.action.travelling.assignRoom(creep, creep.data.homeRoom);
		}
		return false;
	};
}

export default new PrivateerBehaviour();
