import {attack,findClosestByRange,moveTo} from '../action'
export default (creep,roomName) => {
	if (creep.room.name != roomName){
		moveTo(creep,Memory.rooms[roomName].creeps.enemy[0])
	} else{
		attack(creep,Memory.rooms[roomName].creeps.enemy[0])
	}
	
}