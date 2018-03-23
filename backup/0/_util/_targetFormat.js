export default (targetRaw, opt) => {
	if (!targetRaw) return false
	if (opt) _.filter(targetRaw, opt);
	if (_.isArray(targetRaw)) targetRaw = _.first(targetRaw);
	try {
		const target = Game.getObjectById(targetRaw.id);
		return (target) ? target : false
	} catch (e) {
		return false
	}
}