export abstract class Component {
	public extend = (): void => {};
	public fresh = (): void => {};
	public analyze = (): void => {};
	public register = (): void => {};
	public execute = (): void => {};
	public cleanup = (): void => {};
}
