import {attack, dismantle} from '../action'
import {flags} from '../task'
export default (creep) => {
    let memoryFlags = Game.rooms['W82S61'].find(FIND_FLAGS).sort((a, b) => a.secondaryColor - b.secondaryColor).sort((a, b) => a.color - b.color)

    if (memoryFlags.length > 0){
        flags(creep,memoryFlags[0])
    }
}