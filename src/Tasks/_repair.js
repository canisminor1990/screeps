import Config from '../config'
export default (room) => {
	let tasklist = _.filter(room.structures.my.all, s =>
	                        (s.hits / s.hitsMax) < Config.repair.percent &&
	                        s.hits < Config.repair.maxHits
	)
	return _.sortByOrder(tasklist, ['hits'], ['asc'])
}