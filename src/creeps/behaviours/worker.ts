import { RoleType } from '../../enums/creep';
import { Behaviour } from '../Behaviour';

export class WorkerBehavior extends Behaviour {
	constructor() {
		super(RoleType.worker);
	}

	public run(): void {}
}
