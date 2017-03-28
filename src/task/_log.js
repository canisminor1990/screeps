import { color, table, emoji } from '../_util'
export default (roomName, timeout) => {
	"use strict";
	const room          = Game.rooms[roomName];
	const gcl           = Game.gcl,
	      gclLeft       = Math.floor(gcl.progressTotal - gcl.progress),
	      gclSpeed      = Math.round((gcl.progress - Memory.timer['gcl']) / timeout),
	      gclProcess    = Math.round(gcl.progress / gcl.progressTotal * 100),
	      gclTimeLeft   = Math.round(gclLeft / gclSpeed);
	Memory.timer['gcl'] = gcl.progress;

	const rcl           = room.controller,
	      rclProcess    = Math.round(rcl.progress / rcl.progressTotal * 100),
	      rclSpeed      = Math.round((rcl.progress - Memory.timer['rcl']) / timeout),
	      rclLeft       = rcl.progressTotal - rcl.progress,
	      rclTimeLeft   = Math.round(rclLeft / rclSpeed);
	Memory.timer['rcl'] = rcl.progress;

	const rcl2           = Game.rooms['W82S67'].controller,
	      rcl2Process    = Math.round(rcl2.progress / rcl2.progressTotal * 100),
	      rcl2Speed      = Math.round((rcl2.progress - Memory.timer['rcl']) / timeout),
	      rcl2Left       = rcl2.progressTotal - rcl2.progress,
	      rcl2TimeLeft   = Math.round(rcl2Left / rcl2Speed);
	Memory.timer['rcl2'] = rcl2.progress;

	const gclLog      = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft'],
		body  : [
			[color.blue('GCL'), gcl.level, `${gclProcess}%`, gclLeft, gclSpeed, gclTimeLeft],
			[color.orange('RCL 1'), rcl.level, `${rclProcess}%`, rclLeft, rclSpeed, rclTimeLeft],
			[color.orange('RCL 2'), rcl2.level, `${rcl2Process}%`, rcl2Left, rcl2Speed, rcl2TimeLeft],
		]
	}
	//
	const extension   = room.memory.structures.extension;
	let extensionFull = 0;
	extension.forEach(ex => {
		                  if (ex.energy == ex.energyCapacity) extensionFull++
	                  }
	);
	let configCreepNum = 0,
	    roleLog        = [
		    {
			    header: [],
			    body  : [[]]
		    }, {
			    header: [],
			    body  : [[]]
		    }
	    ];
	room.memory.config.role.forEach(role => {
		                                configCreepNum = configCreepNum + role.number;
		                                let number     = Memory.global.creeps[role.role]
		                                let i          = (role.role.match('far')) ? 1 : 0
		                                if (number) {
			                                roleLog[i].header.push(role.role);
			                                roleLog[i].body[0].push(`${number.length}/${role.number}`)
		                                }
	                                }
	)
	const energyLog = {
		header: ['Storage', 'Spawn', 'Extension', 'CanUse', 'Creeps', 'Cpu', 'Bucket'],
		body  : [
			[
				color.yellow(room.memory.structures.storage.store.energy),
				room.memory.structures.spawn.energy,
				extensionFull + '/' + extension.length,
				extensionFull * 50 + room.memory.structures.spawn.energy,
				Object.keys(Memory.creeps).length + '/' + configCreepNum,
				Math.floor(Game.cpu.getUsed()) + '/' + Game.cpu.limit,
				Game.cpu.bucket
			]
		]
	}

	console.log(color.grey(`# Gametime ${Game.time}`),
	            table(gclLog),
	            table(energyLog),
	            table(roleLog[0]),
	            table(roleLog[1])
	);

}

