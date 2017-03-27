import {colorType} from '../_util'
const rowMargin    = 0.3,
      guiWidth     = 4.8,
      guiHeight    = 0.7,
      guiRowMargin = guiHeight + rowMargin + 1;
export default (roomName) => {
	const room = Memory.rooms[roomName];
	let flag = room.flags.gui.room
	if (!flag) return;
	
	const gcl       = Game.gcl,
	      rcl       = room.controller,
	      storage   = room.memory.structures.storage,
	      extension = room.memory.structures.extension,
	      spawn     = room.memory.structures.spawn.energy;
	
	let bgPadding = 0.5,
	    guiX      = flag.x,
	    guiY      = flag.y;
	
	let extensionFull = 0;
	extension.forEach(ex => {
		if (ex.energy == ex.energyCapacity) extensionFull++
	});
	
	room.visual
		.rect(guiX - bgPadding, guiY - 2 * bgPadding, guiWidth + 2 * bgPadding, 6 * guiRowMargin + bgPadding, {
			fill       : 'rgba(0,0,0,.5)',
			opacity    : 0.5,
			stroke     : '#000',
			strokeWidth: 0.05
		})
	
	const guiContent = [
		[colorType.blue, ['GCL', `Lvl ${gcl.level}`, gcl.progress, Math.floor(gcl.progressTotal)]],
		[colorType.orange, ['RCL', `Lvl ${rcl.level}`, rcl.progress, Math.floor(rcl.progressTotal)]],
		[colorType.purple, ['CPU', '', Math.round(Game.cpu.getUsed()), Game.cpu.limit]],
		[colorType.yellow, ['Storage', '', storage.store.energy, storage.storeCapacity]],
		[colorType.yellow, ['Extension', '', extensionFull, extension.length]],
		[colorType.yellow, ['Spawn', '', spawn + extensionFull * 50, 300 + extension.length * 50]]
	]
	
	_.forEach(guiContent, (content, index) => {
		gui(room, guiX, guiY + guiRowMargin * index, content[0], content[1])
	})
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

