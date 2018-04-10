export const wrapLoop = (fn: Function): Function => {
	let tick: number;
	return (): void => {
		tick = Game.time;
		fn();
		RawMemory._parsed = Memory;
	};
};
