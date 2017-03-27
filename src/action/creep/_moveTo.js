import { action, colorType } from "../../_util"
export default (creep, target, color = '#ffffff', noPathFinding = true) => {

	if (creep.fatigue > 0) return false;
	if (!target) return false;

	if (target.pos && target.room && !Game.rooms[target.room.name]) {
		target = new RoomPosition(target.pos.x, target.pos.y, target.room.name)
	}

	if (action(creep, target, creep.moveTo(target, {
			reusePath         : 15,
			serializeMemory   : true,
			noPathFinding     : noPathFinding,
			visualizePathStyle: {
				stroke   : color,
				lineStyle: 'dotted',
				opacity  : 0.25,
				width    : 0.05
			}
		}))) {
		target.room.visual
		      .circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: color})
		if (target.room.roomName == creep.room.roomName) {
			target.room.visual.line(creep.pos, target.pos, {color: color, width: 0.05, opacity: 0.25})
		}
		return true;
	}
}


