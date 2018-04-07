import { RoleType } from '../enums/creep';

export abstract class Behaviour {
	public name: RoleType;

	constructor(name: RoleType) {
		this.name = name;
	}

	abstract run(creep: Creep): void;
}
