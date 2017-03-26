import * as role from '../role';
export default (roomArrary) => {
	const newRoom = {
		pos   : new RoomPosition(25, 47, roomArrary[1]),
		memory: (Game.rooms[roomArrary[1]]) ? Game.rooms[roomArrary[1]].memory : {}
	};
	roomArrary.forEach(room => {
			room = Game.rooms[room];
			if (!room) return;
			for (let name in Game.creeps) {
				let creep = Game.creeps[name]
				switch (creep.memory.role) {
					case 'cleaner':
						role.cleaner(creep)
						break;
					case 'harvester':
						role.harvester(creep)
						break;
					case 'miner':
						role.miner(creep)
						break;
					case 'upgrader':
						role.upgrader(creep)
						break;
					case 'builder':
						role.builder(creep)
						break;
					case 'farBuilder':
						role.farBuilder(creep, newRoom)
						break;
					case 'farHarvester':
						role.farHarvester(creep, newRoom)
						break;
					case 'farMiner':
						role.farMiner(creep, newRoom)
						break;
					case 'claim':
						role.claim(creep, newRoom)
						break;
					case 'attacker':
						role.attacker(creep, newRoom)
						break;
				}
			}
			
			// // cheap base
			// myCreeps.cleaner.forEach(creep => role.cleaner(creep))
			//
			// // source
			// myCreeps.harvester.forEach(creep => role.harvester(creep))
			// myCreeps.miner.forEach(creep => role.miner(creep))
			// myCreeps.upgrader.forEach(creep => role.upgrader(creep))
			// myCreeps.builder.forEach(creep => role.builder(creep))
			//
			// // far
			// myCreeps.farBuilder.forEach(creep => role.farBuilder(creep, newRoom))
			// myCreeps.farHarvester.forEach(creep => role.farHarvester(creep, newRoom))
			// myCreeps.farMiner.forEach(creep => role.farMiner(creep, newRoom))
			// myCreeps.claim.forEach(creep => role.claim(creep, newRoom))
			//
			// // attack
			// myCreeps.attacker.forEach(creep => role.attacker(creep, newRoom))
		}
	)
}

