export default (room) => {
	let tasklist = room.creeps.hostile
	return _.sortByOrder(tasklist, ['hits'], ['asc'])
}