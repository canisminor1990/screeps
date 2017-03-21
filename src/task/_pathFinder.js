import {findDireciton} from '../_util'
const opt = {maxRooms: 1}
export default (creep, target) => {
    let Path;
    const Pos = creep.pos;
    const targetPos = target.pos
    if (creep.memory.lastPos && creep.pos.x == creep.memory.lastPos.x && creep.pos.y == creep.memory.lastPos.y && creep.fatigue == 0) {
        delete(creep.memory.lastPos);
        creep.moveTo(target)
        console.log('pathFinder Debug')
        return
    }

    if (creep.fatigue == 0) creep.memory.lastPos = Pos;

    creep.memory.target = target;
    if (!(creep.memory.path && creep.memory.path.length > 0 || target !== creep.memory.target)) {
        Path = PathFinder.search(Pos, targetPos, opt).path;
        const NextPos = Path[0];
        if (!hasRoad(NextPos)) {
            delete(creep.memory.path);
            const Direciton = findDireciton(Pos, NextPos);
            if (hasRoad(Direciton[0])) {
                Path[0] = Direciton[0]
            } else if (hasRoad(Direciton[1])) {
                Path[0] = Direciton[1]
            }
        }
    } else {
        Path = creep.memory.path;
    }

    if (creep.move(Pos.getDirectionTo(Path.shift())) == 0) {
        creep.memory.path = Path;
        delete(creep.memory.lastPos);
    } else {
        delete(creep.memory.path);
    }
}

function hasRoad(pos) {
    const hasRoad = pos.lookFor(LOOK_STRUCTURES)
        .filter(lookObject => lookObject.structureType == 'road');
    const hasCreep = pos.lookFor(LOOK_CREEPS)
    return (hasRoad.length > 0 && hasCreep.length == 0) ? true : false;
}


