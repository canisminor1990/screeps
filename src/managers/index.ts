import { Manager } from './Manager';
import { CreepManager } from './CreepManager';
import { RoomManager } from './RoomManager';

export enum ManagerPriority {
	CreepManager = 1,
	RoomManager = 2,
}

export function run() {
	const ManagerList: Manager[] = [new CreepManager(), new RoomManager()];

	_.forEach(ManagerList, (manager: Manager) => {
		manager.run();
	});
}
