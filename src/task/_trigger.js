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
		console.log('# [Warn]', roomName, 'Enemy Attack !')
	}
	if (!trigger.safe) {
		const safeTimeout = Game.time - trigger.timeout
		console.log('# [Warn]', roomName, 'Safe Timeout:', `${safeTimeout}/${Memory.rooms[roomName].creeps.enemy[0].ticksToLive}`)
		if (Game.time - trigger.timeout > Memory.rooms[roomName].creeps.enemy[0].ticksToLive) {
			console.log('# [Warn]', roomName, 'Safe Now !')
			Memory.trigger.noEnemy[roomName].safe = true;
			Memory.rooms[roomName].creeps.enemy   = [];
		}
	}
}