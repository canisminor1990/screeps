import config from '../config';
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
	
	
	const room      = Game.rooms[roomName],
	      gcl       = Game.gcl,
	      rcl       = room.controller,
	      storage   = room.memory.structures.storage,
	      extension = room.memory.structures.extension,
	      spawn     = room.memory.structures.spawn.energy;
	
	let extensionFull = 0;
	extension.forEach(ex => {
		if (ex.energy == ex.energyCapacity) extensionFull++
	});
	
	let y = 1;
	config().role.forEach(eachRole => {
		guiCreep(room, .5, y, eachRole.role, eachRole.number)
		y += 1.5;
	})
	
	let x = 10
	gui(room, x, 1, colorType.blue, ['GCL', `Lvl ${gcl.level}`, gcl.progress, gcl.progressTotal])
	gui(room, x, 3, colorType.orange, ['RCL', `Lvl ${rcl.level}`, rcl.progress, rcl.progressTotal])
	gui(room, x, 5, colorType.yellow, ['Storage', '', storage.store.energy, storage.storeCapacity])
	gui(room, x, 7, colorType.yellow, ['Extension', '', extensionFull, extension.length])
	gui(room, x, 9, colorType.yellow, ['Spawn', '', spawn + extensionFull * 50, 300 + extension.length * 50])
}

function gui(room, x, y, color, content) {
	const width  = 6,
	      height = 0.7;
	room.visual
		.rect(x, y + 0.3, width, height, {fill: '#fff', opacity: 0.2})
		.rect(x, y + 0.3, width * content[2] / content[3], height, {fill: color, opacity: 0.7})
		.text(content[0], x, y, {font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(content[1], x + width, y, {font: 0.4, align: 'right', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(`${content[2]} / ${content[3]}`, x + .2, y + 0.8, {
			font       : 0.4,
			align      : 'left',
			stroke     : 'rgba(0,0,0,.7)',
			strokeWidth: 0.1
		});
};

function guiCreep(room, x, y, name, number) {
	let color, colorSwitch = creeps[name].length - number;
	if (colorSwitch > 0) color = colorType.green;
	if (colorSwitch == 0) color = '#fff';
	if (colorSwitch < 0) color = colorType.red;
	const width  = 3,
	      height = 0.2;
	const creeps = room.memory.creeps.my;
	room.visual
		.rect(x, y + 0.3, width, height, {fill: color, opacity: 0.2})
		.rect(x, y + 0.3, width * creeps[name].length / number, height, {fill: '#fff', opacity: 0.7})
		.text(name, x, y, {font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(`${creeps[name].length}/${number}`, x + width, y, {
			font       : 0.4,
			align      : 'right',
			stroke     : 'rgba(0,0,0,.7)',
			strokeWidth: 0.1
		})
};