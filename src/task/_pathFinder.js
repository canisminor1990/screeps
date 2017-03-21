import {findDireciton} from '../_util'
export default (creep, target) => {
    if (creep.memory.lastPos && creep.pos.x == creep.memory.lastPos.x && creep.pos.y == creep.memory.lastPos.y && creep.fatigue == 0) {
        creep.moveTo(target)
        delete(creep.memory.path);
        delete(creep.memory.lastPos);
        console.log('pathFinder Debug')
        return;
    }
    const Pos = creep.pos;
    creep.memory.lastPos = Pos;
    creep.memory.target = target;
    let Path;
    if (!creep.memory.path && target == creep.memory.target) {
        const targetPos = target.pos
        Path = PathFinder.search(Pos, targetPos, {maxRooms: 2}).path;
        const NextPos = Path[0];

        if (!hasRoad(NextPos)) {
            const Direciton = findDireciton(Pos, NextPos);
            if (hasRoad(Direciton[0])) {
                Path[0] = Direciton[0]
            } else if (hasRoad(Direciton[1])) {
                Path[0] = Direciton[1]
            }
        }
        console.log('no')
    }else {
        Path = creep.memory.path
        console.log('yse')
    }
    if (creep.moveByPath(Path) == 0) {
        console.log('ok')
        Path.shift()
    } else {
        delete(creep.memory.path);
        delete(creep.memory.lastPos);
    }
    creep.memory.path = Path;
}

function hasRoad(pos) {
    const hasRoad = pos.lookFor(LOOK_STRUCTURES)
        .filter(lookObject => lookObject.structureType == 'road');
    const hasCreep = pos.lookFor(LOOK_CREEPS)
    return (hasRoad.length > 0 && hasCreep.length == 0) ? true : false;
}


