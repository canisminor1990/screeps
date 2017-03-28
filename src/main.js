import 'screeps-perf';
import './visual';
import * as Manager from './manager'
import * as Gui from './gui'
import {timer} from  './_util'
import {log, trigger} from  './task'
import profiler from 'screeps-profiler';
const rooms = ['W81S67', 'W81S66', 'W82S67'];
profiler.enable();
console.log('# Coding Update!')
trigger.install()
module.exports.loop = () => {
	if (Game.cpuLimit > 100) {
		profiler.wrap(() => {
			trigger()
			Manager.root()
			Manager.memory(rooms)
			Manager.global(rooms)
			Manager.role(rooms)
			Manager.structure(rooms)
			// Gui.creepBar(rooms[0])
			Gui.room(rooms[0])
			Gui.role(rooms[0])
		});
	}
	if (timer(10)) log(rooms[0], 10)
	RawVisual.commit()
}

