export class SchedulerTask {
	name = 'scheduler';
	processes = {
		example: {
			conditions: function() {
				return false;
			},
			run: function() {
				console.log('Hello!');
			},
		},
	};
	register = function() {};
	execute = function() {
		_.forEach(this.processes, function(n, k) {
			if (n.conditions()) n.run();
		});
	};
	registerProcess = function(name, conditions, run) {
		// look for process with existing name and overwrite if there
		const target = this.processes[name];
		if (target) {
			this.processes[name].conditions = conditions;
			this.processes[name].run = run;
		} else {
			this.processes[name] = { conditions: conditions, run: run };
		}
	};
	unregisterProcess = function(name) {
		const target = this.processes[name];
		if (target) {
			delete this.processes[name];
		}
	};
	forceRunProcess = function(name) {
		let target = this.processes[name];
		if (target && target.conditions()) {
			target.run();
		}
	};
}
