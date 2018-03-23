import { Console } from './_util'
import profiler from 'screeps-profiler';
import Config from './config'
import * as flow from './flow';
// info
Console.info('Coding Update!');
// init
if (Config.profiler) profiler.enable();
flow.init()
// loop
const Body = () => {
	(Game.cpu.bucket < 2 * Game.cpu.tickLimit)
		? Console.warn('Lack of CPU!')
		: flow.body()
}
export function loop() {
	(Config.profiler)
		? profiler.wrap(() => Body())
		: Body()
}