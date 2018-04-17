export default {
	fresh() {
		Memory.cpu = {};
	},
	start(name: string, ...module: string[]): void {
		const title = [name].concat(module).join('-');
		_.set(Memory.cpu, title, Game.cpu.getUsed());
	},
	end(name: string, ...module: string[]): void {
		const title = [name].concat(module).join('-');
		if (Memory.cpu[title]) {
			_.set(Memory.cpu, title, Game.cpu.getUsed() - Memory.cpu[title]);
		} else {
			Log.error('not find cpu namespace:', title);
		}
	},
};
