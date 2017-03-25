import {color, table} from '../_util'
export default (roomName) => {
	"use strict";
	const room       = Game.rooms[roomName];
	const gcl        = Game.gcl,
	      gclLeft    = gcl.progressTotal - gcl.progress,
	      gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100);
	
	
	const cl                   = room.controller,
	      clProcess            = Math.round(cl.progress / cl.progressTotal * 100),
	      clSpeed              = Math.round((cl.progress - Memory.timer['controller']) / 10),
	      clLeft               = cl.progressTotal - cl.progress,
	      clTimeLeft           = Math.round(clLeft / clSpeed);
	Memory.timer['controller'] = cl.progress;
	
	const gclLog      = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft'],
		body  : [
			[color.blue('GCL'), gcl.level, `${gclProcess}%`, gclLeft, '', ''],
			[color.orange('CL'), cl.level, `${clProcess}%`, clLeft, clSpeed, clTimeLeft],
		]
	}
	//
	const extension   = room.memory.structures.extension;
	let extensionFull = 0;
	extension.forEach(ex => {
			if (ex.energy == ex.energyCapacity) extensionFull++
		}
	);
	const energyLog = {
		header: ['Storage', 'Spawn', 'Extension', 'CanUse', 'Creeps'],
		body  : [[
			color.yellow(room.memory.structures.storage.store.energy),
			room.memory.structures.spawn.energy,
			extensionFull + '/' + extension.length,
			extensionFull * 50 + room.memory.structures.spawn.energy,
			Object.keys(Memory.creeps).length
		]]
	}
	
	console.log(table(gclLog),table(energyLog));

}

