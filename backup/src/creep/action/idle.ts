let action = new Creep.Action('idle');
module.exports = action;
action.targetRange = 3;
action.isValidAction = function(creep) {
	return true;
};
action.isAddableAction = function(creep) {
	return true;
};
action.isAddableTarget = function(target) {
	return true;
};
action.newTarget = function(creep) {
	return Flag.specialFlag();
};
action.step = function(creep) {
	if (CHATTY) creep.say(this.name, SAY_PUBLIC);
	if (creep.getStrategyHandler([action.name], 'idleMove', creep)) creep.idleMove();
	delete creep.data.actionName;
	delete creep.data.targetId;
};
action.defaultStrategy.idleMove = creep => true;
