declare const CPU: CPUConstructor;

interface CPUConstructor {
	check(n: string): void;

	end(n: string): void;

	fresh(): void;

	start(): void;

	stop(): void;

	status(): void;

	report(): void;
}
