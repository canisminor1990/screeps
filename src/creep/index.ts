import { CreepUtils } from './utils';
import { Component } from '../class';

export default class CreepClass extends Component {
	public extend = (): void => {
		_.assign(Creep, CreepUtils);
		// Creep.prototype.strategy = function(actionName, behaviourName, taskName)
		Util.decorateAgent(
			Creep.prototype,
			{
				default: (creep: Creep) => creep.action && creep.action.name,
				selector: (actionName: string) => Creep.action[actionName],
			},
			{
				default: (creep: Creep) => creep.data.creepType,
				selector: (behaviourName: string) => Creep.behaviour[behaviourName] && Creep.behaviour[behaviourName],
			},
			{
				default: (creep: Creep) => creep.data.destiny && creep.data.destiny.task,
				selector: (taskName: string) => Task[taskName] && Task[taskName],
			},
		);
	};
	private _run = (creep: Creep): void => {
		try {
			creep.run();
		} catch (e) {
			console.log(
				'<span style="color:FireBrick">Creep ' + creep.name + (e.stack || e.toString()) + '</span>',
				Util.stack(),
			);
		}
	};
	public execute = (): void => {
		if (DEBUG && Memory.CPU_CRITICAL)
			Util.logSystem(
				'system',
				`${Game.time}: CPU Bucket level is critical (${Game.cpu.bucket}). Skipping non critical creep roles.`,
			);
		_.forEach(Game.creeps, this._run);
	};
	public register = (): void => {
		for (const action in Creep.action) {
			if (Creep.action[action].register) Creep.action[action].register(this);
		}
		for (const behaviour in Creep.behaviour) {
			if (Creep.behaviour[behaviour].register) Creep.behaviour[behaviour].register(this);
		}
		for (const setup in Creep.setup) {
			if (Creep.setup[setup].register) Creep.setup[setup].register(this);
		}
	};
}
