const trigger = () => {
	isSafe('W81S66')
	isSafe('W82S67')
}

trigger.install = () => {
	Memory.trigger = {
		noEnemy: {
			'W81S66': {
				timeout: 0,
				safe   : true
			},
			'W82S67': {
				timeout: 0,
				safe   : true
			},
		}
	};
}
export default trigger;

function isSafe(roomName) {
	if (Memory.trigger[roomName].safe && Memory.rooms[roomName].creeps.enemy.length > 0) {
		Memory.trigger[roomName] = {
			safe   : false,
			timeout: Game.time
		}
	}
	if (!Memory.trigger[roomName].safe) {
		if (Memory.trigger[roomName].timeout > 0 &&
		    Game.time - Memory.trigger[roomName].timeout > 1500) {
			Memory.trigger[roomName].safe = true;
		}
	}
}