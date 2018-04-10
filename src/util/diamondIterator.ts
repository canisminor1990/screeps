/**
 * A simple diamond pattern iterator which ends after one loop.
 */
export class DiamondIterator {
	public y: number;
	public x: number;
	private _radius: number;
	private _dir: number;
	private _stepA: number;
	private _stepB: number;

	static loop(xy: Pos, radius: number) {
		const center = xy;
		const dist = radius;
		if (!_.isFinite(radius)) throw new Error('not finite: ' + JSON.stringify([xy, radius]));
		return {
			[Symbol.iterator]: function() {
				return new DiamondIterator(center, dist);
			},
		};
	}

	static inside(pos: Pos, xy: Pos, radius: number): boolean {
		return Math.abs(xy.x - pos.x) + Math.abs(xy.y - pos.y) < radius;
	}

	constructor(xy: Pos, radius: number) {
		if (!_.isFinite(radius)) throw new Error('not finite: ' + JSON.stringify([xy, radius]));

		this._radius = radius;
		this.x = xy.x;
		this.y = xy.y;
		this._dir = TOP_RIGHT;
		this._stepA = radius - 0.25;
		this._stepB = 0.25;
	}

	next(): obj {
		const a = this._stepA;
		const b = this._stepB;

		const result = {
			done: false,
			value: {
				x: 0,
				y: 0,
			},
		};

		switch (this._dir) {
			case TOP_RIGHT:
				result.value.x = Math.round(this.x - a); // (this._step - 0.25)); // A
				result.value.y = Math.round(this.y + b); // (this._step - this._radius + 0.25)); // B
				break;
			case BOTTOM_RIGHT:
				result.value.x = Math.round(this.x - b); // (this._step - this._radius + 0.25)); // B
				result.value.y = Math.round(this.y - a); // (this._step - 0.25)); // A
				break;
			case BOTTOM_LEFT:
				result.value.x = Math.round(this.x + a); // (this._step - 0.25)); // A
				result.value.y = Math.round(this.y - b); // (this._step - this._radius + 0.25)); // B
				break;
			case TOP_LEFT:
				result.value.x = Math.round(this.x + a); // (this._step - this._radius + 0.25); // B
				result.value.y = Math.round(this.y + b); // (this._step - 0.25)); // A
				break;
			default:
				return {
					done: true,
					value: false,
				};
		}

		this._stepA = a - 0.5;
		this._stepB = b + 0.5;

		if (this._stepA < 1) {
			this._dir = this._dir + 2;
			this._stepA = this._radius - 0.25;
			this._stepB = 0.25;
		}

		return result;
	}
}
