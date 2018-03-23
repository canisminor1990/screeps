import { Console } from "../../_util"
import action from "../_action"
import _ from "lodash"
export default (creep, target, color = '#ffffff', noPathFinding = true) => {
	if (!target) return false;
	const actionName = 'moveTo';
	if (creep.fatigue > 0) return false;
	let opt = {
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
	try {
		if (_.isArray(target)) target = _.first(target);
		if (target.pos.roomName != creep.pos.roomName) {
			target            = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName);
			opt.noPathFinding = false;
		}
		if (!target) return false;
		if (action({
			           creep     : creep,
			           target    : target,
			           fn        : creep[actionName](target, opt),
		           })) {
			visual(target, creep)
			return true
		}
	} catch (e) {
		Console.error(actionName, creep, JSON.stringify(target))
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