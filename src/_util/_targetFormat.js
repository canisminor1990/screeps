export default (targetRaw) => {
	if (targetRaw instanceof Array) targetRaw = targetRaw[0];
	try {
		const target = Game.getObjectById(targetRaw.id);
		return (target) ? target : false
	} catch (e) {
		return false
	}
}