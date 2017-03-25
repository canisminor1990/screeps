const colorType = {
	yellow: '#E6DB74',
	blue  : '#66D9EF',
	red   : '#F92672',
	purple: '#AE81FF',
	grey  : '#75715E',
	orange: '#FD971F',
	green : '#A6E22E',
};

export default (roomName) => {
	"use strict";
	const room          = Game.rooms[roomName];
	const gcl           = Game.gcl,
	      gclLeft       = gcl.progressTotal - gcl.progress,
	      gclSpeed      = Math.round((gcl.progress - Memory.timer['gcl'])),
	      gclProcess    = Math.round(gcl.progress / gcl.progressTotal * 100),
	      gclTimeLeft   = Math.round(gclLeft / gclSpeed);
	Memory.timer['gcl'] = gcl.progress;
	
	const rcl           = room.controller,
	      rclProcess    = Math.round(rcl.progress / rcl.progressTotal * 100),
	      rclSpeed      = Math.round((rcl.progress - Memory.timer['rcl'])),
	      rclLeft       = rcl.progressTotal - rcl.progress,
	      rclTimeLeft   = Math.round(rclLeft / rclSpeed);
	Memory.timer['rcl'] = rcl.progress;
	
	room.visual
		.circle(1, 1, {radius: .6, fill: 'rgba(0,0,0,.5)', stroke: colorType.blue, strokeWidth: .1, opacity: 1})
		.text('GCL', 1, 1, {color: colorType.blue,font:0.25})
		.text(gcl.level, 1, 1.2, {color: colorType.blue})
	
}