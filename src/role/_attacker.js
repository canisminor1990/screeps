import {attack,findClosestByRange} from '../action'
export default (creep) => {
	attack(creep,findClosestByRange(creep.room.memory.creeps.enemy))
}