import { TaskComponent } from '../../class/Task';

// In this example I prefered to hardcode the example process, but mod.register
// can be used with mod.registerProcess to avoid hardcoding.
class SchedulerTask extends TaskComponent {
	constructor() {
		super('scheduler');
	}

	processes = {
		example: {
			conditions: () => {
				return false;
			},
			run: () =>{
				console.log('Hello!');
			},
		},
	};

	execute = () => {
		_.forEach(this.processes, (n, k) =>{
			if (n.conditions()) n.run();
		});
	};

	registerProcess = (name, conditions, run) => {
		// look for process with existing name and overwrite if there
		const target = this.processes[name];
		if (target) {
			this.processes[name].conditions = conditions;
			this.processes[name].run = run;
		} else {
			this.processes[name] = { conditions: conditions, run: run };
		}
	};

	unregisterProcess = name => {
		const target = this.processes[name];
		if (target) {
			delete this.processes[name];
		}
	};

	forceRunProcess = name => {
		let target = this.processes[name];
		if (target && target.conditions()) {
			target.run();
		}
	};
}

export default new SchedulerTask();
