const trigger = () => {

	
}

trigger.install = () => {
	if (!Memory.trigger) Memory.trigger = {
		dismantle: '',
		noEnemy  : true
	};
}
export default trigger;