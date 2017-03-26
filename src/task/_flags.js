import {attack, moveTo, dismantle} from '../action'
import {flagCommand} from '../_util'
export default (creep) => {
	let flagRaw = creep.room.memory.flags[0];
	if (!flag) return;
	const flag           = flagCommand(flagRaw),
	      pos            = flag.pos,
	      command        = flag.command,
	      commandContent = flag.commandContent;
	let target;
	switch (command) {
		case 'attack' || 'a':
			if (commandContent) {
				target = Game.getObjectById(commandContent.replace(' ', ''));
				if (attack(creep, target[0]))break;
			}
			target = pos.findInRange(creep.room.memory.creeps.enemy, 6)
			if (target.length > 0) {
				if (attack(creep, target[0]))break;
			}
			target = creep.pos.findInRange(creep.room.memory.structures.enemy, 6)
			if (target.length > 0) {
				if (attack(creep, target[0]))break;
			}
			break;
		case 'move' || 'moveTo' || 'moveto' || 'm':
			if (commandContent == 'home') {
				if (moveTo(creep, Game.getObjectById('58ccc9d99f9ea168313dd115')))break;
			} else if (commandContent) {
				if (moveTo(creep, new RoomPosition(48, 21, commandContent)))break;
			}
			target = pos;
			moveTo(creep, target);
			break;
		case 'chai' || 'dis' || 'dismantle':
			if (commandContent) {
				target              = Game.getObjectById(commandContent.replace(' ', ''));
				Memory.trigger.dismantle = target.id
				if (dismantle(creep, target))break;
			}
			target = pos.findInRange(creep.room.memory.structures.enemy, 6)
			if (target.length > 0) {
				if (dismantle(creep, target[0]))break;
			}
			break;
	}
}