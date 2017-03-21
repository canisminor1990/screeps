import { findDireciton } from '../_util'
export default (creep, ...target) => {

	const Pos       = creep.pos;
	const Path      = PathFinder.search(Pos, ...target, {maxRooms: 2});
	const NextPos   = Path.path[0];
	const Direciton = findDireciton(NextPos);
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
}

function hasRoad(pos) {
	const hasRoad = pos.lookFor(LOOK_STRUCTURES)
	                   .filter(lookObject => lookObject.structureType == 'road');
	return (hasRoad.length > 0) ? true : false;
}


