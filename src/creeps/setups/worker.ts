import { RoleType } from '../../enums/creep';
import { Setup } from '../Setup';

export class WorkerSetup extends Setup {
	constructor() {
		super(RoleType.worker);
	}

	public run(): void {}
}
