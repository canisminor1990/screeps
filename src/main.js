import 'screeps-perf';
import * as Manager from './manager'
import {timer} from  './_util'
import {log} from  './task'
import profiler from 'screeps-profiler';


const rooms = ['W81S67', 'W81S66', 'W82S67'];
profiler.enable();


module.exports.loop = () => {
	if (Game.cpuLimit > 100) {
		profiler.wrap(() => {
			Manager.root()
			Manager.memory(rooms)
			Manager.role(rooms)
			Manager.structure(rooms)
		});
		
	}
	
	if (timer(10)) log()
}

