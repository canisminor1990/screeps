import {attack, dismantle} from '../action'
import {flags} from '../task'
export default (creep) => {
 let flagMemory = creep.room.memory.flags
 if (flagMemory && flagMemory.length > 0) flags(creep)


}