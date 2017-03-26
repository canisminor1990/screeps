import config from '../config'
export default (link) => {

	const linkMain = config().linkMain
	if (link.id == linkMain || link.cooldown > 0 || link.energy < link.energyCapacity) return;
	const target = Game.getObjectById(linkMain);
	link.transferEnergy(target);
}