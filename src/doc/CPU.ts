declare const CPU: CPUConstructor;

interface CPUConstructor {
	start(n: string): void;

	end(n: string): void;

	fresh(): void;
}
