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
	
	
	gui(room, .5, 1, colorType.blue, ['GCL', `Lvl ${gcl.level}`, gcl.progress / gcl.progressTotal, `${gcl.progress}/${gcl.progressTotal}`])
	gui(room, .5, 3, colorType.orange, ['RCL', `Lvl ${rcl.level}`, rcl.progress / rcl.progressTotal, `${rcl.progress}/${rcl.progressTotal}`])
}

function gui(room, x, y, color, content) {
	room.visual
		.rect(x, y + 0.3, 6, 0.7, {fill: '#fff', opacity: 0.2})
		.rect(x, y + 0.3, 6 * content[2], 0.7, {fill: color, opacity: 0.7})
		.text(content[0], x, y, {font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(content[1], x + 6, y, {font: 0.4, align: 'right', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(content[3], x + .2, y + 0.8, {
			font       : 0.4,
			align      : 'left',
			stroke     : 'rgba(0,0,0,.7)',
			strokeWidth: 0.1
		});
};