import {default as spawn} from './_spawn';
import {default as tower} from './_tower';
import {default as link} from './_link';
import {default as terminal} from './_terminal';
export default (roomGroup = []) => {
	const structures = Memory.rooms[roomGroup[0]].structures.my;
	_.forEach(structures.spawn, s => spawn(s))
	_.forEach(structures.tower, s => tower(s))
	_.forEach(structures.link, s => link(s))
	_.forEach(structures.terminal, s => terminal(s))
}