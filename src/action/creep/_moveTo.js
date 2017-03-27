import { action, colorType, targetFormat, targetMaker } from "../../_util"
export default (creep, target, color = '#ffffff', noPathFinding = true) => {
	if (creep.fatigue > 0) return false;
	target = targetFormat(target)
	if (!target) return;
	if (!target.room || !Game.rooms[target.pos.roomName]) {
		target = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName)
	}
	targetMaker(creep, target, 'moveTo')
	if (action(creep, target, creep.moveTo(target, {
			reusePath         : 15,
			serializeMemory   : true,
			noPathFinding     : noPathFinding,
			visualizePathStyle: {
				stroke     : color,
				lineStyle  : 'dotted',
				opacity    : 0.5,
				strokeWidth: 0.1
			}
		}))) {
		target.room.visual
		      .circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: color})
		if (target.pos.roomName == creep.pos.roomName) {
			target.room.visual.line(creep.pos, target.pos, {color: color, width: 0.1, opacity: 0.05})
		}
		return true;
	}
}

