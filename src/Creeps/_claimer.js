import {reserveController} from '../Action'
export default (creep) => {
	// target
	if (!Memory.rooms[creep.memory.roomName] || creep.room.name !== creep.memory.roomName) {
		if (creep.moveTo(new RoomPosition(25, 25, creep.memory.roomName)) == OK)return
	} else {
		if (reserveController(creep, creep.room.controller))return;
	}
}