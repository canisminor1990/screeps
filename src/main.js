import 'screeps-perf';
import * as Manager from './manager'
import {timer} from  './_util'
import profiler from 'screeps-profiler';
// import { Room } from 'screeps-globals';

const rooms = ['W81S67', 'W81S66'];
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

	if (timer(10)){
		let controller = Game.rooms[rooms[0]].controller;
		 console.log(`Level ${controller.level} (${controller.progress})`);
	}
}

