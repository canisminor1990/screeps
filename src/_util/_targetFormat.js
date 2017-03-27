export default (target) => {
	if (target.length) target = _.compact(target)[0];
	if (target) {
		return target
	} else {
		return false
	}
}