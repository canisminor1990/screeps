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
const Core = () => {
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Process.install();
	// start process
	Process.loop();
	Game.cacheTime = Game.time;
};

export const loop = ENV === 'production' ? Core : ErrorMapper.wrapLoop(Core);
