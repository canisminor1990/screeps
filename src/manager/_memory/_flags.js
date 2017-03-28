import {flagCommand} from '../../_util'
import * as flags from '../../flags'
export default (room) => {
	const flagsRaw = room.find(FIND_FLAGS).sort((a, b) => a.secondaryColor - b.secondaryColor).sort((a, b) => a.color - b.color);
	
	let flagsMemory = {
		attack   : [],
		moveTo   : [],
		dismantle: [],
		gui      : {}
	}
	flagsRaw.forEach(flagRaw => {
		
		const flag           = flagCommand(flagRaw),
		      command        = flag.command,
		      commandContent = flag.commandContent;
		switch (command) {
			case "store":
				flagsMemory.store = flagRaw.pos.lookFor(LOOK_STRUCTURES);
				break;
			case "gui":
				flagsMemory.gui[commandContent] = flagRaw.pos;
				break;
			case 'attack' || 'a':
				flagsMemory.attack.push(flags.attack(commandContent, flagRaw));
				break;
			case 'move' || 'moveTo' || 'moveto' || 'm':
				flagsMemory.moveTo.push(flags.moveTo(commandContent, flagRaw));
				break;
			case 'dis' || 'dismantle':
				flagsMemory.dismantle.push(flags.dismantle(commandContent, flagRaw));
				break;
		}
	})
	return flagsMemory
}