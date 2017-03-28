import {claimController} from '../action'
import {targetMaker} from '../_util'
export default (creep, roomName) => {
	// target
	if (!creep.memory.target.claim)targetMaker(creep, Memory.rooms[roomName].structures.controller, 'claim')
	// task
	if (claimController(creep, creep.memory.target.claim))return;
}