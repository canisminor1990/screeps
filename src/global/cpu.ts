export default {
	fresh() {
		Memory.cpu = {};
		if (!Memory.CPU_CHECK) Memory.CPU_CHECK = CPU_CHECK;
	},
	check(name: string, ...module: string[]): void {
		if (!Memory.CPU_CHECK) return;
		const title = [name].concat(module).join('-');
		_.set(Memory.cpu, title, Game.cpu.getUsed().toFixed(3));
	},
	end(name: string, ...module: string[]): void {
		if (!Memory.CPU_CHECK) return;
		const title = [name].concat(module).join('-');
		if (Memory.cpu[title]) {
			_.set(Memory.cpu, title, Game.cpu.getUsed().toFixed(3) - Memory.cpu[title]);
		} else {
			Log.error('not find cpu namespace:', title);
		}
	},
	start(): void {
		Memory.CPU_CHECK = true;
		Log.info('CPU Check Start!');
	},
	stop(): void {
		Memory.CPU_CHECK = false;
		CPU.fresh();
		Log.info('CPU Check Stop..');
	},
	status(): boolean {
		Log.info('CPU Check Status:', Memory.CPU_CHECK);
		return Memory.CPU_CHECK;
	},
	report(): void {
		if (Object.keys(Memory.cpu).length === 0) {
			if (!CPU.status()) CPU.start();
			Log.info('CPU wait data...');
			return;
		}
		Log.trace('CPU', Memory.cpu, `total-usage: ${Game.cpu.getUsed().toFixed(3)}`);
	},
	reportOnce(): void {
		if (Object.keys(Memory.cpu).length === 0) {
			if (!CPU.status()) CPU.start();
			Log.info('CPU wait data...');
			return;
		}
		Log.trace('CPU', Memory.cpu, `total-usage: ${Game.cpu.getUsed().toFixed(3)}`);
		CPU.stop();
	},
};
