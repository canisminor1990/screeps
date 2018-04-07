import { RoleType } from '../enums/creep';

export abstract class Setup {
	public name: RoleType;

	constructor(name: RoleType) {
		this.name = name;
	}

	abstract run(): void;
}
