import {default as miner} from './_miner';
import {default as transer} from './_transer';
import {default as upgrader} from './_upgrader';
import {default as cleaner} from './_cleaner';
import {default as builder} from './_builder';
import {default as filler} from './_filler';
import {default as claimer} from './_claimer';
import {default as attacker} from './_attacker';
export default (roomGroup = []) => {
	_.forEach(roomGroup, roomName => {
		const creep = Memory.rooms[roomName].creeps.my;
		_.forEach(creep.miner, c => miner(c));
		_.forEach(creep.transer, c => transer(c));
		_.forEach(creep.cleaner, c => cleaner(c));
		_.forEach(creep.upgrader, c => upgrader(c));
		_.forEach(creep.builder, c => builder(c));
		_.forEach(creep.filler, c => filler(c));
		_.forEach(creep.claimer, c => claimer(c));
		_.forEach(creep.attacker, c => attacker(c));
	})
}