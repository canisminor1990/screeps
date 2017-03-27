export default (targetRaw) => {
	if (targetRaw.length && targetRaw[0] != null) {
		targetRaw = targetRaw[0];
	} else {
		return false
	}
	let target;
	target = Game.getObjectById(targetRaw.id);
	return target
}