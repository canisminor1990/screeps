export default (link) => {
	const linkMain   = link.room.memory.config.linkMain;
	if (link.id == linkMain && link.cooldown > 0 && link.energy < link.energyCapacity) return;
	const target = Game.getObjectById('58d505eb204ecd9e507951f0');
	link.transferEnergy(target);
}