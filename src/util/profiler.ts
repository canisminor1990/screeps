export const profilerUtils = {
	/**
	 * Reset all profiling data
	 */
	resetProfiler(): void {
		Util.loadProfiler(true);
	},

	/**
	 * Load existing profiling data or intialize to defaults.
	 */
	loadProfiler(reset: boolean = false): void {
		if (reset) {
			Util.logSystem('Profiler', 'resetting profiler data.');
			Memory.profiler = {
				totalCPU: 0,
				totalTicks: 0,
				types: {},
				validTick: Game.time,
			};
		}
		global.profiler = Memory.profiler;
	},

	/**
	 * Creates and returns a profiling object, use checkCPU to compare usage between calls
	 */
	startProfiling(name: string, options: obj = {}): any {
		const enabled = _.get(options, 'enabled', true);
		// @ts-ignore
		let checkCPU: Function = function(localName: string, limit: number, type: string): void {};
		let totalCPU: Function = function() {};
		if (PROFILE && enabled) {
			if (_.isUndefined(Memory.profiler)) {
				Util.resetProfiler();
			} else if (
				!global.profiler ||
				global.profiler.validTick !== Memory.profiler.validTick ||
				global.profiler.totalTicks < Memory.profiler.totalTicks
			) {
				Util.loadProfiler();
			}
			const onLoad = options.startCPU || Game.cpu.getUsed();
			let start = onLoad;
			if (PROFILE && !PROFILING.BASIC_ONLY) {
				// Compares usage since startProfiling or the last call to checkCPU and reports if over limit
				checkCPU = function(localName: string, limit: number, type: string): void {
					const current = Game.cpu.getUsed();
					const used = _.round(current - start, 2);
					if (!limit || used > limit) {
						Util.logSystem(name + ':' + localName, used);
					}
					if (type) {
						if (_.isUndefined(global.profiler.types[type]))
							global.profiler.types[type] = {
								totalCPU: 0,
								count: 0,
								totalCount: 0,
							};
						global.profiler.types[type].totalCPU += used;
						global.profiler.types[type].count++;
					}
					start = current;
				};
			}
			// Calculates total usage and outputs usage based on parameter settings
			totalCPU = function() {
				const totalUsed = Game.cpu.getUsed() - onLoad;
				global.profiler.totalCPU += totalUsed;
				global.profiler.totalTicks++;
				const avgCPU = global.profiler.totalCPU / global.profiler.totalTicks;
				if (PROFILE && !PROFILING.BASIC_ONLY && PROFILING.AVERAGE_USAGE && _.size(global.profiler.types) > 0) {
					let string = '';
					let longestType = '';
					_(global.profiler.types)
						.map((data: any, type: string) => {
							data.totalCount += data.count;
							const typeAvg = _.round(data.totalCPU / data.totalCount, 3);
							const r = {
								type,
								typeAvg: typeAvg,
								active: data.count,
								weighted: _.round(typeAvg * data.count, 3),
								executions: data.totalCount,
							};
							data.count = 0;
							return r;
						})
						.sortByOrder('weighted', 'desc')
						.forEach(data => {
							if (data.type.length > longestType.length) longestType = data.type;
							string += `<tr><td>${data.type}</td><td>     ${data.typeAvg}</td><td>   ${data.active}</td><td>     ${
								data.weighted
							}</td><td>   ${data.executions}</td></tr>`;
						})
						.value();
					string += `</table>`;
					Util.logSystem(
						'Average Usage',
						`<table style="font-size:80%;"><tr><th>Type${Array(longestType.length + 2).join(
							' ',
						)}</th><th>(avg/creep/tick)</th><th>(active)</th><th>(weighted avg)</th><th>(executions)</th></tr>`.concat(
							string,
						),
					);
				}
				Util.logSystem(
					name,
					' loop:' + _.round(totalUsed, 2),
					'other:' + _.round(onLoad, 2),
					'avg:' + _.round(avgCPU, 2),
					'ticks:' + global.profiler.totalTicks,
					'bucket:' + Game.cpu.bucket,
				);
				if (PROFILE && !PROFILING.BASIC_ONLY) console.log('\n');
				Memory.profiler = global.profiler;
			};
		}
		return { checkCPU, totalCPU };
	},
};
