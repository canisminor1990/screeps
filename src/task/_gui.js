export default (roomName) =>{
	const room = Game.room[roomName]
	room.find(FIND_MY_CREEPS).forEach(creep => {
		"use strict";
		room.visual.text(
			creep.ticksToLive,
			creep.pos.x,
			creep.pos.y+1,
			{
				stroke: '#111111',
				color: '#ffffff'
			});
	})
	

}