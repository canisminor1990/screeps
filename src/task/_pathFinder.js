import { findDireciton } from '../_util'
export default (creep, target) => {

	if (creep.memory.lastPos && creep.pos.toString() == creep.memory.lastPos.toString()) return creep.moveTo(target);

	if (!target && !target.pos) {
		return;
	}
	const Pos       = creep.pos;
	const targetPos = target.pos
	const Path      = PathFinder.search(Pos, targetPos, {maxRooms: 2});
	const NextPos   = Path.path[0];

	if (Pos.x && NextPos.x) {
		const Direciton = findDireciton(Pos, NextPos);
		let NextStep;
		if (hasRoad(NextPos)) {
			NextStep = Direciton.direction
		} else {
			if (hasRoad(Direciton.directionFixPos[0])) {
				NextStep = Direciton.directionFix[0]
			} else if (hasRoad(Direciton.directionFixPos[1])) {
				NextStep = Direciton.directionFix[1]
			} else {
				NextStep = Direciton.direction
			}
		}
		creep.move(NextStep)
	} else {
		creep.moveTo(target)
		console.log('notPathfound')
	}
	creep.memory.lastPos = Pos;
}

function hasRoad(pos) {
	const hasRoad  = pos.lookFor(LOOK_STRUCTURES)
	                    .filter(lookObject => lookObject.structureType == 'road');
	const hasCreep = pos.lookFor(LOOK_CREEPS)
	return (hasRoad.length > 0 && hasCreep.length == 0) ? true : false;
}


