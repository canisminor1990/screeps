import {findDireciton} from '../_util'
export default (creep, target) => {
    let Path;
    const Pos = creep.pos;
    const targetPos = target.pos
    if (creep.memory.lastPos && creep.pos.x == creep.memory.lastPos.x && creep.pos.y == creep.memory.lastPos.y && creep.fatigue == 0) {
        Path = PathFinder.search(Pos, targetPos, {maxRooms: 2}).path;
        delete(creep.memory.lastPos);
        console.log('pathFinder Debug')
        return;
    } else {
        creep.memory.lastPos = Pos;
        creep.memory.target = target;
        if (!creep.memory.path && target == creep.memory.target) {
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
        } else {
            Path = creep.memory.path;
            console.log('yse')
        }
    }

    if (creep.moveByPath(Path) == 0) {
        console.log('ok')
        Path.shift()
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


