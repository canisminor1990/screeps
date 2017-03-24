import {attack, dismantle} from '../action'
import {flags} from '../task'
export default (creep) => {
    let memoryFlags = creep.room.memory.flags;
    if (memoryFlags.length > 0){
        flags(creep,memoryFlags[0])
    }
}