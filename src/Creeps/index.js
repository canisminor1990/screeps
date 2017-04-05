import { default as miner } from './_miner';
import { default as transer } from './_transer';
import { default as upgrader } from './_upgrader';
import { default as cleaner } from './_cleaner';
import { default as builder } from './_builder';
import { default as filler } from './_filler';
import { default as upfiller } from './_upfiller';
import { default as claimer } from './_claimer';
import { default as attacker } from './_attacker';
import { default as terminer } from './_terminer';
export default (roomGroup = []) => {
	_.forEach(roomGroup, roomName => {
		const creep = Memory.rooms[roomName].creeps.my;
		_.forEach(creep.miner, c => miner(c));
		_.forEach(creep.transer, c => transer(c));
		if (Memory.tasks[roomName].pickup.length > 0 && Memory.rooms[roomName].creeps.my.filler.length > 0) {
			_.forEach(creep.cleaner, c => cleaner(c));
		} else {
			_.forEach(creep.cleaner, c => filler(c));
		}
		_.forEach(creep.upgrader, c => upgrader(c));
		_.forEach(creep.builder, c => builder(c));

		if (Memory.tasks[roomName].pickup.length > 0 && Memory.rooms[roomName].creeps.my.filler.length > 0) {
			_.forEach(creep.upfiller, c => upfiller(c));
		} else {
			_.forEach(creep.upfiller, c => filler(c));
		}
		_.forEach(creep.filler, c => filler(c));
		_.forEach(creep.claimer, c => claimer(c));
		_.forEach(creep.attacker, c => attacker(c));
		_.forEach(creep.terminer, c => terminer(c));
	});
};