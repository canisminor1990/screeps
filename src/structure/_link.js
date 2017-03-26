export default (link) => {
	const linkMain = link.room.memory.config.linkMain;
	if (link.id == linkMain || link.cooldown > 0 || link.energy == 0) return;
	const target = Game.getObjectById(linkMain);
	link.transferEnergy(target);
}