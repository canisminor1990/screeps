import {emoji, color, table} from '../_util'
export default () => {
	"use strict";
	const gcl        = Game.gcl,
	      gclLeft    = gcl.progressTotal - gcl.progress,
	      gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100);
	
	
	const cl                   = Game.spawns['Spawn1'].room.controller,
	      clProcess            = Math.round(cl.progress / cl.progressTotal * 100),
	      clSpeed              = Math.round((cl.progress - Memory.timer['controller']) / 10),
	      clLeft               = cl.progressTotal - cl.progress,
	      clTimeLeft           = Math.round(clLeft / clSpeed);
	Memory.timer['controller'] = cl.progress;
	
	const tableLog = {
		header: ['', 'Lvl', 'Progress', 'Left', 'Speed(tick)', 'TimeLeft'],
		body  : [
			[color.blue('GCL'), gcl.level, `${gclProcess}%`, gclLeft, '', ''],
			[color.orange('CL'), cl.level, `${clProcess}%`, clLeft, clSpeed, clTimeLeft],
		]
	}
	
	console.log(table(tableLog));
}

