import { Component } from '../class';

class CpuConstructor extends Component {
	constructor() {
		super();
		if (!Memory.cpu)
			Memory.cpu = {
				loop: {},
				loops: {},
			};
	}

	fresh = () => {
		Memory.cpu.loop = {};
		if (!Memory.CPU_CHECK) Memory.CPU_CHECK = CPU_CHECK;
	};
	check = (name: string, ...module: string[]): void => {
		if (!Memory.CPU_CHECK) return;
		const title = [name].concat(module).join('-');
		_.set(Memory.cpu.loop, title, Game.cpu.getUsed());
	};
	end = (name: string, ...module: string[]): void => {
		if (!Memory.CPU_CHECK) return;
		const title = [name].concat(module).join('-');
		const oldData = Memory.cpu.loop[title];
		if (oldData) {
			_.set(Memory.cpu.loop, title, (Game.cpu.getUsed() - oldData).toFixed(3));
		} else {
			Log.error('not find cpu namespace:', title);
		}
	};
	handleData = (): void => {
		if (!Memory.CPU_CHECK) return;
		const cpu = Game.cpu.getUsed().toFixed(3);
		Memory.cpu.cpu = cpu;
		if (!Memory.cpu.cpus) {
			Memory.cpu.cpus = [cpu];
		} else {
			Memory.cpu.cpus.push(cpu);
		}
		_.forEach(Memory.cpu.loop, (value: number, key: string) => {
			if (!Memory.cpu.loops[key]) {
				Memory.cpu.loops[key] = [value];
			} else {
				Memory.cpu.loops[key].push(value);
			}
		});
	};
	start = (): void => {
		Memory.CPU_CHECK = true;
		Log.info('CPU Check Start!');
		Memory.cpu = {
			loop: {},
			loops: {},
			cpu: 0,
			cpus: [],
		};
	};
	stop = (): void => {
		Memory.CPU_CHECK = false;
		Memory.cpu = {
			loop: {},
			loops: {},
			cpu: 0,
			cpus: [],
		};
		Log.info('CPU Check Stop..');
	};
	status = (): boolean => {
		Log.info('CPU Check Status:', Memory.CPU_CHECK);
		return Memory.CPU_CHECK;
	};
	report = (): void => {
		if (Object.keys(Memory.cpu).length === 0) {
			if (!this.status()) this.start();
			Log.info('CPU wait data...');
			return;
		}
		const cpus: number[] = Memory.cpu.cpus;
		let cpuRepot = (_.sum(cpus) / cpus.length).toFixed(3);
		let report = {};
		_.forEach(Memory.cpu.loops, (value: number[], key: string) => {
			report[key] = (_.sum(value) / value.length).toFixed(3);
		});

		Log.trace('CPU', report, `usage: ${cpuRepot} | avg: ${cpus.length} ticks`);
	};
	reportOnce = (): void => {
		if (Object.keys(Memory.cpu.loop).length === 0) {
			if (!this.status()) this.start();
			Log.info('CPU wait data...');
			return;
		}
		Log.trace('CPU', Memory.cpu.loop, `total-usage: ${Game.cpu.getUsed().toFixed(3)}`);
		this.stop();
	};
}

export default new CpuConstructor();
