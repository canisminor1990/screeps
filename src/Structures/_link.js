export default (link) => {
	const linkMain = Memory.flags[link.room.name].link.id
	if (link.id == linkMain || link.cooldown > 0 || link.energy < link.energyCapacity) return;
	const target = Game.getObjectById(linkMain);
	if (target.energy == 0) link.transferEnergy(target);
}