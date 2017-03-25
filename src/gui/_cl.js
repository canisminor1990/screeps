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
		.rect(1, 1.2, 4, 0.4, {fill: 'rgba(255,255,255,.2)',opacity:1})
		.rect(1, 1.2, 4 / gcl.progressTotal * gcl.progress, 0.4, {fill: colorType.blue, opacity: 1})
		.text(`GCL: ${gcl.level}`, 1, 1, {font: 0.5, align: 'left', opacity: 1})
	
}