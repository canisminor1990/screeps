const chalk = require('chalk');
import {emoji} from '../_util'
export default () => {
	"use strict";
	const gcl        = Game.gcl,
	      gclLeft    = gcl.progressTotal - gcl.progress,
	      gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100);
	const logGcl     = chalk.red('[GCL]') + `Lv${gcl.level} (${gclProcess}%|${gclLeft})`
	
	
	const cl                   = Game.spawns['Spawn1'].room.controller,
	      clProcess            = Math.round(cl.progress / cl.progressTotal * 100),
	      clSpeed              = Math.round((cl.progress - Memory.timer['controller']) / 10),
	      clLeft               = cl.progressTotal - cl.progress,
	      clTimeLeft           = Math.round(clLeft / clSpeed);
	Memory.timer['controller'] = cl.progress;
	const logController        = chalk.blue('[GCL]') + `Lv${cl.level} (${clProcess}%|${clLeft}|${clSpeed}/tick|${clTimeLeft}tickLeft)`;
	
	
	console.log(emoji.claim, logGcl, logController);
}