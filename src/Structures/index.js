import {default as spawn} from './_spawn';
import {default as tower} from './_tower';
import {default as link} from './_link';
export default (roomGroup = []) => {
	const structures = Memory.rooms[roomGroup[0]].structures.my;
	_.forEach(structures.spawn, s => spawn(s))
	// spawn(structures.spawn[0])
	_.forEach(structures.tower, s => tower(s))
	_.forEach(structures.link, s => link(s))
}