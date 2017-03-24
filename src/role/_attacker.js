import {attack, dismantle,moveTo} from '../action'
import {flags} from '../task'
export default (creep) => {
 // let flagMemory = creep.room.memory.flags
 // if (flagMemory && flagMemory.length > 0) flags(creep)

    moveTo(creep, Game.getObjectById('58ccc9d99f9ea168313dd115'))
}