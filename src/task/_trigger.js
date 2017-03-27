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
	if (Memory.trigger.noEnemy[roomName].safe && Memory.rooms[roomName].creeps.enemy.length > 0) {
		Memory.trigger.noEnemy[roomName] = {
			safe   : false,
			timeout: Game.time
		}
	}
	if (!Memory.trigger.noEnemy[roomName].safe) {
		if (Memory.trigger.noEnemy[roomName].timeout > 0 &&
		    Game.time - Memory.trigger.noEnemy[roomName].timeout > 1500) {
			Memory.trigger.noEnemy[roomName].safe = true;
		}
	}
}