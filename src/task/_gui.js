export default (roomName) =>{
	const room = Game.rooms[roomName]
	room.find(FIND_MY_CREEPS).forEach(creep => {
		"use strict";
		room.visual.rect(
			creep.pos.x,
			creep.pos.y-1,
			2,
			0.2,
			{
				stroke: '#111111',
				color: '#ffffff'
			});
	})
	

}