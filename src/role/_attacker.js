import {attack, dismantle} from '../action'
import {flags} from '../task'
export default (creep) => {

    // flags(creep)
    let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (attack(creep, target)) return;
}