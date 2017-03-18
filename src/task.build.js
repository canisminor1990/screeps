export default (x, y, type) => {
	if (x && y && type) {
		Game.spawns['Spawn1'].room.createConstructionSite(x, y, `STRUCTURE_${type.toUpperCase()}`)
		console.log(`[Build] STRUCTURE_${type.toUpperCase()} in x:${x} y:${y}`)
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