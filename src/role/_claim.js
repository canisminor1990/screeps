import {claimController} from '../action'
import {targetMaker} from '../_util'
export default (creep, roomName) => {
	//
	targetMaker(creep, Memory.rooms[roomName].structures.controller, 'claim')
	if (claimController(creep, creep.memory.claim))return;
}