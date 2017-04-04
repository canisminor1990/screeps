import {transfer, withdraw, moveTo} from '../Action';
import {Is} from  '../_util';
import Config from '../config'
export default (creep) => {
	"use strict";
	let terminal = Game.getObjectById('58dd5bacde932923491d37d8');
	let storage  = Game.rooms[creep.memory.bornRoom].storage
	if (storage.store.energy < Config.terminal.storage && Memory.tasks.market.length > 0) {
		storage = Memory.tasks.market[0]
	}
	const isFull = Is.full(creep);
	if (!isFull) {
		if (creep.room.name !== storage.room.name) {
			if (moveTo(creep, storage))return
		}
		if (withdraw(creep, storage, false)) return
	} else {
		if (creep.room.name !== terminal.room.name) {
			if (moveTo(creep, terminal))return
		}
		if (terminal.store.energy < terminal.storeCapacity && transfer(creep, terminal)) return
	}
}