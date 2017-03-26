const trigger = () => {
	isSafe('W81S66')
	isSafe('W82S67')
}

trigger.install = () => {
	if (!Memory.trigger) Memory.trigger = {
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
	if (Memory.trigger[roomName].safe &&
		(!Game.rooms[roomName] || Game.rooms[roomName].memory.creeps.enemy.length > 0)) {
		Memory.trigger[roomName].safe    = false
		Memory.trigger[roomName].timeout = Game.time
	}
	if (!Memory.trigger[roomName].safe) {
		if (Game.time - Memory.trigger.timeout > 1500) Memory.trigger[roomName].safe = true;
	}
}