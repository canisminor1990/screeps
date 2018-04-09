export function getDistanseBetween(pos1: Pos | RoomPosition, pos2: Pos | RoomPosition): number {
	const xDiff = pos2.x - pos1.x;
	const yDiff = pos2.y - pos1.y;
	return Math.floor(Math.pow(xDiff * xDiff + yDiff * yDiff, 0.5));
}
