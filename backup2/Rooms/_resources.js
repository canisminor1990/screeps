export default (source, mineral) => {
	mineral = _.filter(mineral, m => m.mineralAmount > 0)
	return {
		all    : [].concat(source, mineral),
		source : source,
		mineral: mineral
	}
}