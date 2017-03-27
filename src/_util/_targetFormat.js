export default (target) => {
	if (!target) return
	if (target.length) target = _.compact(target)[0];
	return target
}