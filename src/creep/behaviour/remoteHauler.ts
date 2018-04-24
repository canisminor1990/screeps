import { CreepBehaviour } from '../Behaviour';

class RemoteHaulerBehaviour extends CreepBehaviour {
	constructor() {
		super('remoteHauler');
		this.setState({
			picking: {
				name: `picking-${this.name}`,
				energyOnly: false,
			},
		});
	}
	nextAction = creep => {
		const flag = creep.data.destiny && Game.flags[creep.data.destiny.targetName];
		if (!flag) {
			// TODO: in the future look for a nearby room we can support
			return CreepManager.action.recycling.assign(creep);
		}

		// at home
		if (creep.pos.roomName == creep.data.homeRoom) {
			// carrier filled
			if (creep.sum > 0) {
				let deposit = []; // deposit energy in...
				// links?
				if (creep.carry.energy == creep.sum) deposit = creep.room.structures.links.privateers;
				// storage?
				if (creep.room.storage) deposit.push(creep.room.storage);
				// containers?
				if (creep.room.structures.container) deposit = deposit.concat(creep.room.structures.container.privateers);
				// Choose the closest
				if (deposit.length > 0) {
					let target = creep.pos.findClosestByRange(deposit);
					if (target.structureType == STRUCTURE_STORAGE && this.assignAction(creep, 'storing', target)) return;
					else if (this.assignAction(creep, 'charging', target)) return;
					else if (this.assignAction(creep, 'storing')) return; // prefer storage
				}
				if (this.assignAction(creep, 'charging')) return;
				// no deposit :/
				// try spawn & extensions
				if (this.assignAction(creep, 'feeding')) return;
				if (this.assignAction(creep, 'dropping')) return;
				else {
					const drop = r => {
						if (creep.carry[r] > 0) creep.drop(r);
					};
					_.forEach(Object.keys(creep.carry), drop);
					return this.assignAction(creep, 'idle');
				}
			}
			// empty
			// travelling
			if (this.gotoTargetRoom(creep)) {
				return;
			}
		} else if (creep.data.destiny.room == creep.pos.roomName) {
			// at target room
			// TODO: This should perhaps check which distance is greater and make this decision based on that plus its load size
			if (creep.sum / creep.carryCapacity > REMOTE_HAULER.MIN_LOAD) {
				this.goHome(creep);
				return;
			}
			// picking last until we have state that can compare cost vs benefit otherwise remoteHaulers bounce between piles of dropped energy
			if (this.assignAction(creep, 'uncharging')) return;
			// if (this.assignAction(creep, CreepManager.action.robbing)) return;
			if (this.assignAction(creep, 'picking')) return;
			// wait
			if (creep.sum === 0) {
				let source = creep.pos.findClosestByRange(creep.room.sources);
				if (creep.room && source && creep.pos.getRangeTo(source) > 3) {
					creep.data.travelRange = 3;
					return this.assignAction(creep, 'travelling', source);
				}
			}
			return this.assignAction(creep, 'idle');
		} else {
			// somewhere
			let ret = false;
			// TODO: This should perhaps check which distance is greater and make this decision based on that plus its load size
			if (creep.sum / creep.carryCapacity > REMOTE_HAULER.MIN_LOAD) ret = this.goHome(creep);
			else ret = this.gotoTargetRoom(creep);
			if (ret) {
				return;
			}
		}
		// fallback
		// recycle self
		let mother = Game.spawns[creep.data.motherSpawn];
		if (mother) {
			this.assignAction(creep, CreepManager.action.recycling, mother);
		}
	};
	gotoTargetRoom = creep => {
		const targetFlag = creep.data.destiny ? Game.flags[creep.data.destiny.targetName] : null;
		if (targetFlag) return CreepManager.action.travelling.assignRoom(creep, targetFlag.pos.roomName);
	};
	goHome = creep => {
		return CreepManager.action.travelling.assignRoom(creep, creep.data.homeRoom);
	};
}

export default new RemoteHaulerBehaviour();
