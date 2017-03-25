import {emoji, color, table} from '../_util'
export default () => {
	"use strict";
	const room       = Game.spawns['Spawn1'].room
	const gcl        = Game.gcl,
	      gclLeft    = gcl.progressTotal - gcl.progress,
	      gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100);
	
	
	const cl                   = room.controller,
	      clProcess            = Math.round(cl.progress / cl.progressTotal * 100),
	      clSpeed              = Math.round((cl.progress - Memory.timer['controller']) / 10),
	      clLeft               = cl.progressTotal - cl.progress,
	      clTimeLeft           = Math.round(clLeft / clSpeed);
	Memory.timer['controller'] = cl.progress;
	
	const gclLog    = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft'],
		body  : [
			[color.blue('GCL'), gcl.level, `${gclProcess}%`, gclLeft, '', ''],
			[color.orange('CL'), cl.level, `${clProcess}%`, clLeft, clSpeed, clTimeLeft],
		]
	}
	//
	const energyLog = {
		header: ['Type', 'Store'],
		body  : [
			[color.yellow('Spawn'), room.memory.structures.spawn.energy],
			[color.yellow('Storage'), room.memory.structures.storage.store.energy]
		]
	}
	
	return console.log(table(gclLog));
	return console.log(table(energyLog));
}

