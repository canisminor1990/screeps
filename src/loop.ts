import { ErrorMapper } from './util/ErrorMapper';
import Process from './Process';

const cpuAtLoad = Game.cpu.getUsed();
let cpuAtFirstLoop;
const Loop = () => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Process.install();
	if (!cpuAtFirstLoop) cpuAtFirstLoop = cpuAtLoop;
	// start process
	Process.loop();
	Game.cacheTime = Game.time;
	if (DEBUG && TRACE)
		Util.trace('main', {
			cpuAtLoad,
			cpuAtFirstLoop,
			cpuAtLoop,
			cpuTick: Game.cpu.getUsed(),
			isNewServer: global.isNewServer,
			lastServerSwitch: Game.lastServerSwitch,
			main: 'cpu',
		});
};
export default (ENV === 'production' ? Loop : ErrorMapper.wrapLoop(Loop));
