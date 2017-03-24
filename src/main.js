import 'screeps-perf';
import * as Manager from './manager'
import {timer} from  './_util'
import profiler from 'screeps-profiler';
import {flags} from './task';

const rooms = ['W81S67', 'W81S66','W82S67'];
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
            process = Math.round(controller.progress / controller.progressTotal * 100),
            speed = Math.round((controller.progress - Memory.timer['controller']) / 10),
            letf = controller.progressTotal - controller.progress,
            timeLeft = Math.round(letf / speed / 60 * 1.5);

        console.log('[Controller]',
            `Lvl ${controller.level}`,
            `(${process}%|${letf}|${speed}/tick)`,
            `TimeLeft:${timeLeft}min`);

        Memory.timer['controller'] = controller.progress;
    }
}

