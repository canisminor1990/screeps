import {action} from "../_util"
export default (creep, target, color = '#ffffff') => {


    if (creep.fatigue > 0) return false;
    if (!target) return false;

    if (action(creep, target, creep.moveTo(target, {
            reusePath: 12,
            serializeMemory: true,
            visualizePathStyle: {stroke: color}
        }))) return true;

}


