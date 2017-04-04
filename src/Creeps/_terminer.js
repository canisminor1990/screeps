import {transfer, withdraw} from '../Action';
import {Is} from  '../_util';
import Config from '../config'
export default (creep) => {
	"use strict";
	let terminal  = Game.getObjectById('58dd5bacde932923491d37d8');
	const storage = Game.rooms[creep.memory.bornRoom].storage
	const isFull  = Is.full(creep);
	if (!isFull) {
		if (storage.store.energy > Config.terminal.storage && withdraw(creep, storage)) return
	} else {
		if (terminal.store.energy < terminal.storeCapacity && transfer(creep, terminal)) return
	}
}