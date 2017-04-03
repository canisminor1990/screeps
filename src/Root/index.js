import cleanCreepsMemory from './_cleanCreepsMemory'

const root = () => {
	cleanCreepsMemory()
}

root.room = (rooms) => {
	_.forEach(rooms, roomGroup => {
		for (let name in roomGroup) {
			if (!Game.rooms[roomGroup[name]]) {
				const roomMain = Memory.rooms[roomGroup[0]],
				      roomName = roomGroup[name];
				if (roomMain.creeps.my.claimer.length < 1) {
					const spawn     = Game.getObjectById(roomMain.structures.my.spawn[0].id),
					      spawnName = `claimer-${roomName}`;
					spawn.createCreep([CLAIM,
					                   CLAIM,
					                   MOVE], spawnName, {
						bornRoom: roomGroup[0],
						bornTime: Game.time,
						roomName: roomName,
						roomType: 'extra',
						role    : 'claimer',
						name    : spawnName,
						target  : {}
					})
				}
				roomGroup.pop()
			}
		}
	})
	return rooms;
}

export default root;