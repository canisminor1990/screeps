import 'screeps-perf';
import * as Manager from './manager'
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
	test: () =>{
		console.log('test')
	}
}

