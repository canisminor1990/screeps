import {attack,findClosestByRange} from '../action'
export default (creep) => {
	
	attack(creep,findClosestByRange(Memory.rooms['W81S66'].creeps.enemy))
}