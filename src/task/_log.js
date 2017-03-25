import {color, table} from '../_util'
export default (roomName) => {
	"use strict";
	const room       = Game.rooms[roomName];
	const gcl        = Game.gcl,
	      gclLeft    = gcl.progressTotal - gcl.progress,
	      gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100);
	
	
	const rcl                   = room.controller,
	      rclProcess            = Math.round(rcl.progress / rcl.progressTotal * 100),
	      rclSpeed              = Math.round((rcl.progress - Memory.timer['controller']) / 10),
	      rclLeft               = cl.progressTotal - rcl.progress,
	      rclTimeLeft           = Math.round(rclLeft / rclSpeed);
	Memory.timer['controller'] = rcl.progress;
	
	const gclLog      = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft'],
		body  : [
			[color.blue('GCL'), gcl.level, `${gclProcess}%`, gclLeft, '', ''],
			[color.orange('RCL'), rcl.level, `${rclProcess}%`, rclLeft, rclSpeed, rclTimeLeft],
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

