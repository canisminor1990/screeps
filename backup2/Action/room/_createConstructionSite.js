import { Console } from "../../_util"
export default (creep, type) => {
	try {
		if (creep.room.createConstructionSite(creep.pos, type)) return true
	} catch (e) {
		Console.error('createConstructionSite', e, creep, type)
		return false
	}
}