Object.defineProperties(RoomPosition.prototype, {
	adjacent: {
		get(): number {
			if (_.isUndefined(this._adjacent)) {
				this._adjacent = [];
				for (let x = this.x - 1; x < this.x + 2; x++) {
					for (let y = this.y - 1; y < this.y + 2; y++) {
						if (x > 0 && x < 49 && y > 0 && y < 49) {
							this._adjacent.push(new RoomPosition(x, y, this.roomName));
						}
					}
				}
			}
			return this._adjacent;
		},
	},
	radius: {
		value: function(radius: number = 1): RoomPosition[] {
			if (radius === 1) return this.adjacent;
			if (radius < 1) return [this];
			const positions = [];
			for (let x = this.x - radius; x <= this.x + radius; x++) {
				for (let y = this.y - radius; y <= this.y + radius; y++) {
					const pos = new RoomPosition(x, y, this.roomName);
					if (x < 50 && x > 0 && y > 0 && y < 50 && !_.isEqual(this, pos)) {
						positions.push(pos);
					}
				}
			}
			return positions;
		},
	},
});
