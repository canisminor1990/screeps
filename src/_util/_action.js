export default (creep, target, fc, text) => {
	switch (fc) {
		case OK:
			if (text) creep.say(text);
			break;
		case ERR_NOT_OWNER             :
			creep.say("NOT_OWNER");
			break;
		case ERR_NO_PATH               :
			creep.say("NO_PATH");
			break;
		case ERR_NAME_EXISTS           :
			creep.say("NAME_EXISTS");
			break;
		case ERR_BUSY                  :
			creep.say("BUSY");
			break;
		case ERR_NOT_FOUND             :
			creep.say("NOT_FOUND");
			break;
		case ERR_NOT_ENOUGH_ENERGY     :
			creep.say("NOT_ENOUGH_ENERGY");
			break;
		case ERR_NOT_ENOUGH_RESOURCES  :
			creep.say("NOT_ENOUGH_RESOURCES");
			break;
		case ERR_INVALID_TARGET        :
			creep.say("INVALID_TARGET");
			break;
		case ERR_FULL                  :
			creep.say("FULL");
			break;
		case ERR_NOT_IN_RANGE          :
			pathFinder(creep, target)
			break;
		case ERR_INVALID_ARGS          :
			creep.say("INVALID_ARGS");
			break;
		case ERR_TIRED                 :
			creep.say("TIRED");
			break;
		case ERR_NO_BODYPART           :
			creep.say("NO_BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS :
			creep.say("NOT_ENOUGH_EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH        :
			creep.say("RCL_NOT_ENOUGH");
			break;
		case ERR_GCL_NOT_ENOUGH        :
			creep.say("GCL_NOT_ENOUGH");
			break;
	}
}
