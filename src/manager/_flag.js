import {flagCommand} from '../_util'
import * as flags from '../flags'
export default (roomArrary) => {
	roomArrary.forEach(room => {
		let flagsMemory = Game.rooms[room].memory.flags;
		flagsMemory.forEach(flagRaw => {
			const flag           = flagCommand(flagRaw),
			      pos            = flag.pos,
			      command        = flag.command,
			      commandContent = flag.commandContent;
			
			switch (command) {
				case 'attack' || 'a':
					flags.attack(commandContent)
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
						target                   = Game.getObjectById(commandContent.replace(' ', ''));
						Memory.trigger.dismantle = target.id
						if (dismantle(creep, target))break;
					}
					target = pos.findInRange(creep.room.memory.structures.enemy, 6)
					if (target.length > 0) {
						if (dismantle(creep, target[0]))break;
					}
					target = pos.findInRange(creep.room.memory.structures.my, 0)
					if (target.length > 0) {
						Memory.trigger.dismantle = target.id
						if (dismantle(creep, target[0]))break;
					}
					break;
			}
			
			return {
				attack   : [],
				moveTo   : [],
				dismantle: [],
				gui      : []
			}
		})
	})
}