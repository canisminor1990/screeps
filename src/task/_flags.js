import {attack, moveTo, dismantle} from '../action'
export default (creep) => {
	let flag = creep.room.memory.flags[0];
	if (!flag) return;
	let name = flag.name;
	if (!name.match(/\//)) flag.remove();
	const pos = flag.pos;
	let command, commandContent;
	command = name.replace('/', '');
	if (name.match(' ')) {
		command = command.match(/[a-z]+ /)
		commandContent = name.replace('/' + command, '')
	}
	console.log(command, commandContent)
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
				target = Game.getObjectById(commandContent.replace(' ', ''));
				Memory.flags.dismantle = target.id
				if (dismantle(creep, target))break;
			}
			target = pos.findInRange(creep.room.memory.structures.enemy, 6)
			if (target.length > 0) {
				Memory.flags.dismantle = target[0].id
				if (dismantle(creep, target[0]))break;
			}
			break;
	}
}