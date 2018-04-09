const TRAVEL_NEW_TICK = 1;

const visual = {
	fill: 'transparent',
	stroke: '#fff',
	lineStyle: 'dashed',
	strokeWidth: 0.15,
};

export function travelTo(target: RoomPosition | { pos: RoomPosition }): number {
	if (this.fatigue > 0) return ERR_TIRED;
	this.memory.unMove = this.isMove ? 0 : this.memory.unMove + 1;

	const travelOldTo = this.moveTo(target, {
		reusePath: this.memory.unMove <= TRAVEL_NEW_TICK ? Infinity : 0,
		noPathFinding: true,
		visualizePathStyle: {
			...visual,
			stroke: '#000',
			opacity: 0.1,
		},
	});
	this.memory._pos = this.pos;
	if (travelOldTo === OK && this.memory.unMove === 0) return OK;
	const travelNewTo = this.moveTo(target, {
		// maxOps: 200,
		plainCost: 10,
		swampCost: 50,
		ignoreCreeps: this.memory.unMove <= TRAVEL_NEW_TICK,
		costCallback: (roomName: string, costMatrix: CostMatrix) => {
			const unBuidRoads = _.filter(
				this.room.constructionSites,
				(s: ConstructionSite) => s.structureType === STRUCTURE_ROAD,
			);
			_.forEach(unBuidRoads, (road: ConstructionSite) => costMatrix.set(road.pos.x, road.pos.y, 0));
		},
		visualizePathStyle: {
			...visual,
			stroke: '#fff',
			opacity: 0.5,
		},
	});
	this.memory._pos = this.pos;
	return travelNewTo;
}
