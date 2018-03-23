export default () => {
	function roomPositionIdentifier(roomPosition) {
		return roomPosition.roomName + 'x' + roomPosition.x + 'y' + roomPosition.y;
	};
	
	Room.prototype.findPath = function (fromPos, toPos, options) {
		creepMemoryCleanUp();
		if (!Memory.pathOptimizer) {
			Memory.pathOptimizer = {lastCleaned: Game.time};
		}
		
		if (Game.time - Memory.pathOptimizer.lastCleaned > 40 && !this._cleanedUp) {
			var keys = Object.keys(Memory.pathOptimizer);
			keys.forEach((key) => {
				var val = Memory.pathOptimizer[key];
				if (val && ((val.used / (Game.time - val.tick) < 1 / 300) || Game.time - val.tick > 2000)) {
					Memory.pathOptimizer[key] = undefined;
				}
			});
			this._cleanedUp                  = true;
			Memory.pathOptimizer.lastCleaned = Game.time;
		}
		
		var pathIdentifier = roomPositionIdentifier(fromPos) + roomPositionIdentifier(toPos);
		if (!Memory.pathOptimizer[pathIdentifier]) {
			var path                             = originalFindPath.apply(this, arguments);
			Memory.pathOptimizer[pathIdentifier] = {
				tick: Game.time,
				path: Room.serializePath(path),
				used: 1
			}
		} else {
			Memory.pathOptimizer[pathIdentifier].used++;
		}
		
		return Room.deserializePath(Memory.pathOptimizer[pathIdentifier].path);
	}
	
}