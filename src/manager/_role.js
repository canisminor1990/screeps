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
					case 'linker':
						role.linker(creep)
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
						role.farBuilder(creep, roomArrary[1])
						break;
					case 'farHarvester':
						role.farHarvester(creep, roomArrary[1])
						break;
					case 'farMiner':
						role.farMiner(creep, roomArrary[1])
						break;
					case 'claim':
						role.claim(creep, roomArrary[1])
						break;
					case 'farMinerSec':
						role.farMiner(creep, roomArrary[2])
						break;
					case 'claimSec':
						role.claim(creep, roomArrary[2])
						break;
					case 'attacker':
						role.attacker(creep, newRoom)
						break;
				}
			}
		}
	)
}

function newRoomMaker(roomName) {
	return {
		pos   : new RoomPosition(25, 47, roomName),
		memory: (Memory.rooms[roomName]) ? Memory.rooms[roomName] : {}
	};
}