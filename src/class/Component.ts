export abstract class Component {
	public extend = (props?: any): void => {};
	public fresh = (props?: any): void => {};
	public analyze = (props?: any): void => {};
	public register = (props?: any): void => {};
	public run = (props?: any): void => {};
	public cleanup = (props?: any): void => {};
}
