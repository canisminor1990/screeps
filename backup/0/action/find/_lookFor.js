import { debug } from '../../_util'
export default (creep, type = LOOK_STRUCTURES, opt) => {
	try {
		let found = creep.pos.lookFor(type)
		if (opt) {
			found.filter(opt => {
				opt.structureType == opt
			});
		}
		return (found && found.length > 0) ? found[0] : false
	} catch (e) {
		debug(e, 'lookFor', creep, type, opt)
		return false
	}
}