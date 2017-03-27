export default (targetRaw) => {
	if (!targetRaw.pos) return false
	console.log(targetRaw)
	return new RoomPosition(targetRaw.pos.x, targetRaw.pos.y, targetRaw.pos.roomName)
}