export default (targetRaw) => {
	if (!targetRaw.pos) return false
	return new RoomPosition(targetRaw.pos.x, targetRaw.pos.y, targetRaw.pos.roomName)
}