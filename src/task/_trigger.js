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
	const trigger = Memory.trigger.noEnemy[roomName];
	if (trigger.safe && Memory.rooms[roomName].creeps.enemy.length > 0) {
		Memory.trigger.noEnemy[roomName] = {
			safe   : false,
			timeout: Game.time
		}
	}
	if (!trigger.safe) {
		if (Game.time - trigger.timeout > 1500) {
			console.log(roomName + 'Safe now !')
			Memory.trigger.noEnemy[roomName].safe = true;
			Memory.rooms[roomName].creeps.enemy   = [];
		}
	}
}