import { moveTo } from './'
import { Ui } from '../_util'
export default ({creep, target, actionName, fn, color = "#fff"}) => {
	const emoji = (Ui.emoji[actionName]) ? Ui.emoji[actionName] : actionName
	switch (fn) {
		case OK:
			if (actionName) creep.say(emoji);
			return true;
		case ERR_NOT_OWNER             :
			creep.say(emoji + "OWNER");
			break;
		case ERR_NO_PATH               :
			creep.say(emoji + "PATH");
			break;
		case ERR_NAME_EXISTS           :
			creep.say(emoji + "NAME");
			break;
		case ERR_BUSY                  :
			creep.say(emoji + "BUSY");
			break;
		case ERR_NOT_FOUND             :
			creep.say(Ui.emoji.moveTo);
			moveTo(creep, target, color, false);
			return true;
		case ERR_NOT_ENOUGH_ENERGY     :
			creep.say(emoji + "ENERGY");
			if (creep.memory.role == 'miner') moveTo(creep, target, color);
			return true;
		case ERR_NOT_ENOUGH_RESOURCES  :
			creep.say(emoji + "RESOURCES");
			return true;
		case ERR_INVALID_TARGET        :
			moveTo(creep, target, color);
			return true;
		case ERR_FULL                  :
			creep.say(emoji + "FULL");
			delete (creep.memory.target.transfer)
			break;
		case ERR_NOT_IN_RANGE          :
			moveTo(creep, target, color);
			return true;
		case ERR_INVALID_ARGS          :
			creep.say(emoji + "ARGS");
			break;
		case ERR_TIRED                 :
			creep.say(emoji + "TIRED");
			break;
		case ERR_NO_BODYPART           :
			creep.say(emoji + "BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS :
			creep.say(emoji + "EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH        :
			creep.say(emoji + "RCL");
			break;
		case ERR_GCL_NOT_ENOUGH        :
			creep.say(emoji + "GCL");
			break;
	}
	return false;
}
