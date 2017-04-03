export default (roomName) => {
	const room = Game.rooms[roomName]
	room.find(FIND_MY_CREEPS).forEach(creep => {
		"use strict";
		room.visual.rect(
			creep.pos.x-1,
			creep.pos.y - 1,
			1,
			0.2,
			{fill: '#000'});
		
		room.visual.rect(
			creep.pos.x-1,
			creep.pos.y - 1,
			1 / 1500 * creep.ticksToLive,
			0.2,
			{
				fill   : '#66D9EF',
				opacity: 1
			})
	})
	
	
}