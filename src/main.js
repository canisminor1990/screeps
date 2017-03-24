import 'screeps-perf';
import * as Manager from './manager'
import { timer } from  './_util'
import profiler from 'screeps-profiler';
// import { Room } from 'screeps-globals';

const rooms = ['W81S67', 'W81S66'];
let left;
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

	if (timer(10)) {

		let controller = Game.rooms[rooms[0]].controller,
		    process    = Math.round(controller.progress / controller.progressTotal * 100),
		    speed      = Math.round((controller.progress - left) * (-1) / 10);
		left           = controller.progress;
		console.log('[Controller]', `Lvl ${controller.level}`, `(${process}%|${controller.progressTotal - controller.progress}|${speed}/tick)`, `speed:${speed}/tick`);
	}
}

