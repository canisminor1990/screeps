import {colorType} from '../_util'
import config from '../config';
const rowMargin         = 0.3,
      guiCreepWidth     = 3.5,
      guiCreepHeight    = 0.2,
      guiCreepRowMargin = guiCreepHeight + rowMargin + 1;
export default (roomName) => {
	const room = Game.rooms[roomName];
	
	let flag = room.memory.flags.filter(flags => flags.name.match(/\/gui role/))[0]
	if (!flag) return;
	let bgPadding = 0.5,
	    guiCreepX = flag.pos.x,
	    guiCreepY = flag.pos.y;
	
	room.visual
		.rect(guiCreepX - bgPadding, guiCreepY - 2 * bgPadding, guiCreepWidth + 2 * bgPadding, config().role.length * guiCreepRowMargin + bgPadding, {
			fill       : 'rgba(0,0,0,.5)',
			opacity    : 0.5,
			stroke     : '#000',
			strokeWidth: 0.05
		});
	
	config().role.forEach(eachRole => {
		guiCreep(room, guiCreepX, guiCreepY, eachRole.role, eachRole.number)
		guiCreepY += guiCreepRowMargin;
	})
}

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