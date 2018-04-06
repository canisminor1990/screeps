import { Manager } from './Manager';
import { MemoryManager } from './MemoryManager';
import { RoomManager } from './RoomManager';

export enum ManagerPriority {
	MemoryManager = 1,
	RoomManager = 2,
}

export function run() {
	const ManagerList: Manager[] = [new MemoryManager(), new RoomManager()];

	_.forEach(ManagerList, (manager: Manager) => {
		manager.run();
	});
}
