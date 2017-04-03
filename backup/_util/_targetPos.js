export default (targetRaw) => {
	try {
		return new RoomPosition(targetRaw.pos.x, targetRaw.pos.y, targetRaw.pos.roomName)
	} catch (e) {
		return false
	}
}