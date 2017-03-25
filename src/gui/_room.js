import config from '../config';
const colorType         = {
	yellow: '#E6DB74',
	blue  : '#66D9EF',
	red   : '#F92672',
	purple: '#AE81FF',
	grey  : '#75715E',
	orange: '#FD971F',
	green : '#A6E22E',
};
const rowMargin         = 0.3,
      guiWidth          = 4.8,
      guiHeight         = 0.7,
      guiRowMargin      = guiHeight + rowMargin + 1,
      guiCreepWidth     = 3.5,
      guiCreepHeight    = 0.2,
      guiCreepRowMargin = guiCreepHeight + rowMargin + 1;


export default (roomName) => {
	let bgPadding = 0.5,
	    guiCreepX = .5,
	    guiCreepY = 1,
	    guiX      = guiCreepX + guiCreepWidth + bgPadding * 2,
	    guiY      = 1;
	
	
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
	
	room.visual
		.rect(guiCreepX - bgPadding, guiCreepY - 2 * bgPadding, guiCreepWidth + 2 * bgPadding, 10 * guiCreepRowMargin + bgPadding, {
			fill       : 'rgba(0,0,0,.5)',
			opacity    : 0.5,
			stroke     : '#000',
			strokeWidth: 0.05
		})
		.rect(guiX - bgPadding, guiY - 2 * bgPadding, guiWidth + 2 * bgPadding, 6 * guiRowMargin + bgPadding, {
			fill       : 'rgba(0,0,0,.5)',
			opacity    : 0.5,
			stroke     : '#000',
			strokeWidth: 0.05
		})
	
	
	config().role.forEach(eachRole => {
		guiCreep(room, guiCreepX, guiCreepY, eachRole.role, eachRole.number)
		guiCreepY += guiCreepRowMargin;
	})
	
	
	gui(room, guiX, guiY, colorType.blue, ['GCL', `Lvl ${gcl.level}`, gcl.progress, gcl.progressTotal])
	gui(room, guiX, guiY + guiRowMargin, colorType.orange, ['RCL', `Lvl ${rcl.level}`, rcl.progress, rcl.progressTotal])
	gui(room, guiX, guiY + guiRowMargin * 2, colorType.purple, ['CPU', '', Math.round(Game.cpu.getUsed()), Game.cpu.limit])
	gui(room, guiX, guiY + guiRowMargin * 3, colorType.yellow, ['Storage', '', storage.store.energy, storage.storeCapacity])
	gui(room, guiX, guiY + guiRowMargin * 4, colorType.yellow, ['Extension', '', extensionFull, extension.length])
	gui(room, guiX, guiY + guiRowMargin * 5, colorType.yellow, ['Spawn', '', spawn + extensionFull * 50, 300 + extension.length * 50])
}

function gui(room, x, y, color, content) {
	const colorSwitch = content[2] - content[3];
	if (colorSwitch > 0) color = colorType.red;
	let LineWidth = (colorSwitch > 0) ? content[3] : content[2]
	room.visual
		.rect(x, y + rowMargin, guiWidth, guiHeight, {fill: '#fff', opacity: 0.2})
		.rect(x, y + rowMargin, guiWidth * LineWidth / content[3], guiHeight, {fill: color, opacity: 0.7})
		.text(content[0], x, y, {font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(content[1], x + guiWidth, y, {font: 0.4, align: 'right', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(`${content[2]} / ${content[3]}`, x + .2, y + 0.8, {
			font       : 0.4,
			align      : 'left',
			stroke     : 'rgba(0,0,0,.7)',
			strokeWidth: 0.1
		});
};

function guiCreep(room, x, y, name, number) {
	const creeps           = Memory.creepsGlobal,
	      nowNumber        = (creeps[name]) ? creeps[name].length : 0;
	let color, colorSwitch = nowNumber - number;
	if (colorSwitch > 0) color = colorType.green;
	if (colorSwitch == 0) color = '#fff';
	if (colorSwitch < 0) color = colorType.red;
	let LineWidth = (colorSwitch > 0) ? number : nowNumber
	room.visual
		.rect(x, y + rowMargin, guiCreepWidth, guiCreepHeight, {fill: color, opacity: 0.2})
		.rect(x, y + rowMargin, guiCreepWidth * LineWidth / number, guiCreepHeight, {fill: color, opacity: 0.7})
		.text(name, x, y, {font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1})
		.text(`${nowNumber}/${number}`, x + guiCreepWidth, y, {
			font       : 0.4,
			align      : 'right',
			stroke     : 'rgba(0,0,0,.7)',
			strokeWidth: 0.1
		})
};