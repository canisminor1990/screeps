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
	if (!Memory.trigger[roomName]) return;
	if (Memory.trigger[roomName].safe &&
		(!Game.rooms[roomName] || Memory.rooms[roomName].memory.creeps.enemy.length > 0)) {
		Memory.trigger[roomName].safe    = false
		Memory.trigger[roomName].timeout = Game.time
	}
	if (!Memory.trigger[roomName].safe) {
		if (Game.time - Memory.trigger[roomName].timeout > 1500) Memory.trigger[roomName].safe = true;
	}
}