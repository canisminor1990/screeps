import 'screeps-perf';
import * as Manager from './manager'
import * as Gui from './gui'
import { timer } from  './_util'
import { log, trigger } from  './task'
import profiler from 'screeps-profiler';
const rooms = ['W81S67', 'W81S66', 'W82S67'];
profiler.enable();
console.log('# Coding Update!')
trigger.install()

// switch
const profilerEnabled = false;

// main
const main = () => {
	if (Game.cpu.bucket < 2 * Game.cpu.tickLimit) {
		console.log(`# Lack of CPU!`);
		return;
	}
	trigger()
	Manager.root()
	Manager.memory(rooms)
	Manager.global(rooms)
	Manager.role(rooms)
	Manager.structure(rooms)
	// GUI
	Gui.room(rooms[0])
	Gui.role(rooms[0])
	// Log
	if (timer(10)) log(rooms[0], 10)
}

// loop
module.exports.loop = () => {
	if (profilerEnabled) {
		profiler.wrap(function () {
			main();
		});
	} else {
		main();
	}
}
