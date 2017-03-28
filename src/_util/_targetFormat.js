export default (targetRaw) => {
	if (_.isArray(targetRaw)) targetRaw = _.first(targetRaw);
	try {
		const target = Game.getObjectById(targetRaw.id);
		return (target) ? target : false
	} catch (e) {
		return false
	}
}