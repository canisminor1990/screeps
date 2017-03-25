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
		.rect(1, 1.3, 6, 0.6, {fill: '#000', opacity: 0.5})
		.rect(1, 1.3, 6 / gcl.progressTotal * gcl.progress, 0.6, {fill: colorType.blue, opacity: 1})
		.text(`GCL`, 1, 1, {font: 0.5, align: 'left', opacity: 1})
		.text(`Lvl ${gcl.level}`, 1.5, 1, {font: 0.4, align: 'left',color:colorType.blue})
		.text(`${gcl.progress}/${gcl.progressTotal}`, 1.2, 1.6, {font: 0.4, align: 'left',stroke:'rgba(0,0,0,.5)'})
	
}