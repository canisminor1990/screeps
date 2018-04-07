import { Manager } from './Manager';
import { CreepManager } from './CreepManager';
import { RoomManager } from './RoomManager';
import { SpawnManager } from './SpawnManager';

export class Managers {
	static run() {
		const ManagerList: Manager[] = [new CreepManager(), new RoomManager(), new SpawnManager()];

		_.forEach(ManagerList, (manager: Manager) => {
			manager.run();
		});
	}
}
