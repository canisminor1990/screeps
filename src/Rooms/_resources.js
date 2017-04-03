export default (source, mineral) => {
	return {
		all    : source.concat(mineral),
		source : source,
		mineral: mineral
	}
}