import { CreepBehaviour } from '../../class';

class ClaimerBehaviour extends CreepBehaviour {
	constructor() {
		super('claimer');

		this._run = this.run;
		this.run = creep => {
			this._run(creep);
			if (creep.hits < creep.hitsMax && (!creep.action || creep.action.name !== 'travelling')) {
				// creep injured. move to next owned room
				if (creep.data) {
					if (!creep.data.nearestHome || !Game.rooms[creep.data.nearestHome]) {
						const nearestSpawnRoom = Room.bestSpawnRoomFor(creep.pos.roomName);
						if (nearestSpawnRoom) {
							creep.data.nearestHome = nearestSpawnRoom.name;
						}
					}
					if (creep.data.nearestHome) {
						Creep.action.travelling.assignRoom(creep, creep.data.nearestHome);
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
	actions = creep => {
		return [Creep.action.claiming, Creep.action.reserving, Creep.action.bulldozing];
	};
}

export default new ClaimerBehaviour();
