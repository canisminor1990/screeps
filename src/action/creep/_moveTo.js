import { action, targetFormat, targetChanger,debug  } from "../../_util"
export default (creep, target, color = '#ffffff', noPathFinding = true) => {
	const actionName = 'moveTo';
	if (creep.fatigue > 0) return false;
	try {
		if (target instanceof Array) target = target[0];
		try {
			if (target.pos.roomName != creep.pos.roomName) {
				target        = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName);
				noPathFinding = false;
			} else {
				target = targetFormat(target);
			}
		} catch (e) {
			return false
		}
		targetChanger(creep, target, actionName)
		const opt = {
			reusePath         : 15,
			serializeMemory   : true,
			noPathFinding     : noPathFinding,
			visualizePathStyle: {
				stroke     : color,
				lineStyle  : 'dotted',
				opacity    : 0.5,
				strokeWidth: 0.1
			}
		}
		if (action(creep, target, creep[actionName](target, opt))) {
			visual(target, creep)
			return true
		}
	} catch (e) {
		debug(e,actionName,creep, targetRaw)
		return false
	}
}

function visual(target, creep, color) {
	try {
		target.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: color})
		if (target.pos.roomName == creep.pos.roomName) {
			target.room.visual.line(creep.pos, target.pos, {
				color  : color,
				width  : 0.1,
				opacity: 0.05
			})
		}
	} catch (e) {}
}