/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * _____ _____ _____ _____ _____ _____ _____    _____    __ _____ _____    *
 * |   __|     | __  |   __|   __|  _  |   __|  |     |__|  | __  |  |  |  *
 * |__   |   --|    -|   __|   __|   __|__   |  |  |  |  |  | __ -|    -|  *
 * |_____|_____|__|__|_____|_____|__|  |_____|  |_____|_____|_____|__|__|  *
 *                                                                         *
 *            OJBK Repo: https://github.com/ScreepsAI/screeps              *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { ErrorMapper } from './util/ErrorMapper';
import { Splash } from './util/splash';
import Process from './Process';

Splash();
const cpuAtLoad = Game.cpu.getUsed();
let cpuAtFirstLoop;
const Core = () => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Process.install();
	if (!cpuAtFirstLoop) cpuAtFirstLoop = cpuAtLoop;
	// start process
	Process.loop();
	Game.cacheTime = Game.time;
	if (LOG_TRACE) Log.trace('main', Memory.cpu, `total-usage: ${Game.cpu.getUsed().toFixed(3)}`);
};

export const loop = ENV === 'production' ? Core : ErrorMapper.wrapLoop(Core);
