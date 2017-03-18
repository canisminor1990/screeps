export default (x, y, type) => {
	if (x && y && type) {
		console.log(`[Build] ${type} in x:${x} y:${y}`,Game.spawns['Spawn1'].room.createConstructionSite(x, y, type))
	} else {
		console.log(
				`You can build: ` +
				['spawn',
				 'extension',
				 'road',
				 'constructedWall',
				 'rampart',
				 'keeperLair',
				 'portal',
				 'controller',
				 'link',
				 'storage',
				 'tower',
				 'observer',
				 'powerBank',
				 'powerSpawn',
				 'extractor',
				 'lab',
				 'terminal',
				 'container',
				 'nuker'].join('|')
		)
	}
}