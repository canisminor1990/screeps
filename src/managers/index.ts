import { Manager } from './Manager';
import { CreepManager } from './CreepManager';
import { RoomManager } from './RoomManager';

export class Managers {
	static run() {
		const ManagerList: Manager[] = [new CreepManager(), new RoomManager()];

		_.forEach(ManagerList, (manager: Manager) => {
			manager.run();
		});
	}
}
