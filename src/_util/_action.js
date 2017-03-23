export default (creep, target, fc, text) => {
	switch (fc) {
		case OK:
			if (text) creep.say(text);
			break;
		case ERR_NOT_OWNER             :
			creep.say("ERR_NOT_OWNER");
			break;
		case ERR_NO_PATH               :
			creep.say("ERR_NO_PATH");
			break;
		case ERR_NAME_EXISTS           :
			creep.say("ERR_NAME_EXISTS");
			break;
		case ERR_BUSY                  :
			creep.say("ERR_BUSY");
			break;
		case ERR_NOT_FOUND             :
			creep.say("ERR_NOT_FOUND");
			break;
		case ERR_NOT_ENOUGH_ENERGY     :
			creep.say("ERR_NOT_ENOUGH_ENERGY");
			break;
		case ERR_NOT_ENOUGH_RESOURCES  :
			creep.say("ERR_NOT_ENOUGH_RESOURCES");
			break;
		case ERR_INVALID_TARGET        :
			creep.say("ERR_INVALID_TARGET");
			break;
		case ERR_FULL                  :
			creep.say("ERR_FULL");
			break;
		case ERR_NOT_IN_RANGE          :
			pathFinder(creep, target)
			break;
		case ERR_INVALID_ARGS          :
			creep.say("ERR_INVALID_ARGS");
			break;
		case ERR_TIRED                 :
			creep.say("ERR_TIRED");
			break;
		case ERR_NO_BODYPART           :
			creep.say("ERR_NO_BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS :
			creep.say("ERR_NOT_ENOUGH_EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH        :
			creep.say("ERR_RCL_NOT_ENOUGH");
			break;
		case ERR_GCL_NOT_ENOUGH        :
			creep.say("ERR_GCL_NOT_ENOUGH");
			break;
	}
}
