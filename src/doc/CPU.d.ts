declare const CPU: CPUConstructor;

interface CPUConstructor {
	check(n: string, ...module?: string[]): void;

	end(n: string, ...module?: string[]): void;

	fresh(): void;

	start(): void;

	stop(): void;

	status(): void;

	report(): void;

	handleData: void;
}
