import {pathFinder} from '../task'
export default (creep, target, fc, text) => {
	switch (fc) {
		case OK:
			if (text) creep.say(text, {public: true});
			return true;
			break;
		case ERR_NOT_OWNER             :
			creep.say(text + "OWNER");
			break;
		case ERR_NO_PATH               :
			creep.say(text + "PATH");
			break;
		case ERR_NAME_EXISTS           :
			creep.say(text + "NAME");
			break;
		case ERR_BUSY                  :
			creep.say(text + "BUSY");
			break;
		case ERR_NOT_FOUND             :
			creep.say(text + "FOUND");
			break;
		case ERR_NOT_ENOUGH_ENERGY     :
			creep.say(text + "ENERGY");
			break;
		case ERR_NOT_ENOUGH_RESOURCES  :
			creep.say(text + "RESOURCES");
			break;
		case ERR_INVALID_TARGET        :
			creep.say(text + "TARGET");
			break;
		case ERR_FULL                  :
			creep.say(text + "FULL");
			break;
		case ERR_NOT_IN_RANGE          :
			pathFinder(creep, target);
			return true;
			break;
		case ERR_INVALID_ARGS          :
			creep.say(text + "ARGS");
			break;
		case ERR_TIRED                 :
			creep.say(text + "TIRED");
			break;
		case ERR_NO_BODYPART           :
			creep.say(text + "BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS :
			creep.say(text + "EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH        :
			creep.say(text + "RCL");
			break;
		case ERR_GCL_NOT_ENOUGH        :
			creep.say(text + "GCL");
			break;
	}
}
