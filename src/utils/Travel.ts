import { Emoji } from './Emoji';

const TRAVEL_NEW_TICK = 3;

const visual = {
	fill: 'transparent',
	stroke: '#fff',
	lineStyle: 'dashed',
	strokeWidth: 0.15,
	opacity: 0.1,
};

export function travelTo(target: RoomPosition | { pos: RoomPosition }): number {
	if (this.fatigue > 0) return ERR_TIRED;
	this.memory.unMove = this.isMove ? 0 : this.memory.unMove + 1;

	const travelOldTo = this.moveTo(target, {
		reusePath: Infinity,
		noPathFinding: true,
		visualizePathStyle: {
			...visual,
			stroke: '#000',
		},
	});
	this.memory._pos = this.pos;
	if (travelOldTo === OK && this.memory.unMove === 0) return OK;
	const travelNewTo = this.moveTo(target, {
		reusePath: this.memory.unMove <= TRAVEL_NEW_TICK ? Infinity : 0,
		maxOps: 200,
		plainCost: 10,
		swampCost: 50,
		ignoreCreeps: this.memory.unMove <= TRAVEL_NEW_TICK,
		costCallback: (roomName: string, costMatrix: CostMatrix) => {
			const unbuidRoads = _.filter(
				this.room.constructionSites,
				(s: ConstructionSite) => s.structureType === STRUCTURE_ROAD,
			);
			_.forEach(unbuidRoads, (road: ConstructionSite) => costMatrix.set(road.pos.x, road.pos.y, 0));
		},
		visualizePathStyle: {
			...visual,
			stroke: '#fff',
		},
	});
	this.memory._pos = this.pos;
	this.say(Emoji.walk);
	return travelNewTo;
}
