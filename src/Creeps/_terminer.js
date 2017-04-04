import Config from '../config';
export default () => {
	"use strict";
	let terminal = creep.room.memory.structures.my.terminal;
	if (terminal.length > 0 && _.sum(terminal[0].store) < 10000) {
		if (transfer(creep, terminal[0], false))return
	}
}