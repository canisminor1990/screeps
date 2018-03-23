export default () => {
	const room      = Game.spawns['Spawn1'].room
	let targetArray = [].concat(
		room.find(FIND_SOURCES),
		room.controller
	)
	_.forEach(targetArray, target => buildRoad(target))
}
function buildRoad(target) {
	const room    = Game.spawns['Spawn1'].room
	let pathArray = PathFinder.search(Game.spawns['Spawn1'].pos, target.pos, {
		plainCost: 1,
		swampCost: 1,
		maxRooms : 1,
		heuristicWeight     : 100
	})
	_.forEach(pathArray.path, path => {
		room.createConstructionSite(path.x, path.y, STRUCTURE_ROAD)
	})
}