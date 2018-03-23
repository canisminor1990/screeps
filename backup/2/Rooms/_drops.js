export default (data) => {
	const all     = [].concat(data);
	let energy    = _.remove(data, d => d.resourceType == RESOURCE_ENERGY),
	      mineral = data

	return {
		all    : all,
		energy : energy,
		mineral: mineral
	}
}