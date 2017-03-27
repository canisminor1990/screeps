export default (target, getid = false) => {
	if (!target) return
	if (target.length) target = _.compact(target)[0];
	if (getid) target = Game.getObjectById(target.id)
	return target
}