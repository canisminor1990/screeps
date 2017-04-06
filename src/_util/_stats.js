export default () => {
	Memory.stats["room." + room.name + ".energyAvailable"] = room.energyAvailable;
	Memory.stats["room." + room.name + ".energyCapacityAvailable"] = room.energyCapacityAvailable;
	Memory.stats["room." + room.name + ".controllerProgress"] = room.controller.progress;
};