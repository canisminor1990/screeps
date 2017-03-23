export default (creep, target, color = '#ffffff') => {
	if (creep.fatigue > 0) return;
	creep.moveTo(target, {
		reusePath         : 12,
		serializeMemory   : true,
		visualizePathStyle: {stroke: color}
	})
}

