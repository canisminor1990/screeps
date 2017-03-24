import * as role from '../role';
export default (roomArrary) => {

	_.each(roomArrary, room => {
		if (!Game.rooms[room]) return;
		room = Game.rooms[room];
		const Memory           = room.memory;
		const myCreeps         = Memory.creeps.my;
		const newRoom = {
			pos   : new RoomPosition(25, 47, roomArrary[1]),
			memory: (Game.rooms[roomArrary[1]]) ? Game.rooms[roomArrary[1]].memory : {}
		};

		myCreeps.cleaner.forEach(creep => role.cleaner(creep))

		myCreeps.harvester.forEach(creep => role.harvester(creep))
		myCreeps.miner.forEach(creep => role.miner(creep))
		myCreeps.upgrader.forEach(creep => role.upgrader(creep))
		myCreeps.builder.forEach(creep => role.builder(creep))

		// far
		myCreeps.farBuilder.forEach(creep => role.farBuilder(creep, newRoom))
		myCreeps.farHarvester.forEach(creep => role.farHarvester(creep, newRoom))
		myCreeps.farMiner.forEach(creep => role.farMiner(creep, newRoom))
		myCreeps.claim.forEach(creep => role.claim(creep, newRoom))
	})
}

