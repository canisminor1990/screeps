export default (targetRaw) => {
	if (targetRaw instanceof Array) {
		targetRaw = targetRaw[0];
	}
	if (!targetRaw || !targetRaw.id) return false;
	let target;
	target = Game.getObjectById(targetRaw.id);
	return (target) ? target : false
}