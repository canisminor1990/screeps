const trigger = () => {
	if (!Game.rooms['W81S66'] || Game.rooms['W81S66'].memory.creeps){
		
	}
}

trigger.install = () => {
	if (!Memory.trigger) Memory.trigger = {
		noEnemy: {
			'W81S66': true,
			'W82S67': true
		}
	};
}
export default trigger;