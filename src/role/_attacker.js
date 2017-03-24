import {attack, dismantle} from '../action'
import {flags} from '../task'
export default (creep) => {
    let memoryFlags = creep.pos.findInRange(FIND_FLAGS).sort((a, b) => a.secondaryColor - b.secondaryColor).sort((a, b) => a.color - b.color)
console.log(memoryFlags)
    if (memoryFlags.length > 0){
        flags(creep,memoryFlags[0])
    }
}