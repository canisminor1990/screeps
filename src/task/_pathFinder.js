import {findDireciton} from '../_util'
export default (creep, target) => {

    if (creep.memory.lastPos && creep.pos.x == creep.memory.lastPos.x && creep.pos.y == creep.memory.lastPos.y && creep.fatigue == 0) {
        creep.moveTo(target)
        console.log('pathFinder Debug')
        return;
    }

    const Pos = creep.pos;
    const targetPos = target.pos
    let Path = PathFinder.search(Pos, targetPos, {maxRooms: 2});
    creep.memory.path = Path;
    const NextPos = Path.path[0];

    if (Pos.x && NextPos.x) {
        if (!hasRoad(NextPos)) {
            const Direciton = findDireciton(Pos, NextPos);
            if (hasRoad(Direciton[0])) {
                console.log(Path.path[0])
                Path.path[0] = Direciton[0]
                console.log(Path.path[0])
            } else if (hasRoad(Direciton[1])) {
                console.log(Path.path[0])
                Path.path[0] = Direciton[1]
                console.log(Path.path[0])
            }
        }
       console.log( creep.moveByPath(Path.path))
    }
    creep.memory.lastPos = Pos;
}

function hasRoad(pos) {
    const hasRoad = pos.lookFor(LOOK_STRUCTURES)
        .filter(lookObject => lookObject.structureType == 'road');
    const hasCreep = pos.lookFor(LOOK_CREEPS)
    return (hasRoad.length > 0 && hasCreep.length == 0) ? true : false;
}


