export default (source, mineral) => {
	return {
		all    : source.concat(mineral),
		source : source,
		mineral: _.filter(mineral,m => m.mineralAmount > 0)
	}
}