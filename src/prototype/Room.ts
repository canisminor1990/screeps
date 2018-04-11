Object.defineProperties(Room.prototype, {
	newFlag: {
		/**
		 * Create a new flag
		 * @param {Object|string} flagColour - An object with color and secondaryColor properties, or a string path for a FLAG_COLOR
		 * @param {RoomPosition} [pos] - The position to place the flag. Will assume (25, 25) if left undefined
		 * @param {string} [name] - Optional name for the flag
		 * @returns {string|Number} The name of the flag or an error code.
		 */
		value: (flagColour: obj | string, pos: RoomPosition, name: string): string | number | void => {
			if (!pos) pos = this.getPositionAt(25, 25);
			return pos.newFlag(flagColour, name);
		},
	},
});
