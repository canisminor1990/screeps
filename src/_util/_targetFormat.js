export default (targetRaw) => {
	if (!targetRaw) return
	if (targetRaw.length) targetRaw = _.compact(targetRaw)[0];
	let target;
	target = Game.getObjectById(targetRaw.id);
	return (target != null) ? target : false
}