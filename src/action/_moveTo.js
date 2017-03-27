import { action,colorType } from "../_util"
export default (creep, target, color = '#ffffff') => {

	if (creep.fatigue > 0) return false;
	if (!target) return false;

	if (target.pos && target.room && !Game.rooms[target.room.name]) {
		target = new RoomPosition(target.pos.x, target.pos.y, target.room.name)
	}

	if (action(creep, target, creep.moveTo(target, {
			reusePath         : 15,
			serializeMemory   : true,
			noPathFinding     : true,
			visualizePathStyle: {
				stroke   : color,
				lineStyle: 'dotted'
			}
		}))) {
		return true;
	}
}


