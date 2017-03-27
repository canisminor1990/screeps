import {claimController} from '../action'
export default (creep, roomName) => {
	//
	targetMaker(creep, Memory.rooms[roomName].structures.controller, 'claim')
	if (claimController(creep, creep.memory.claim))return;
}