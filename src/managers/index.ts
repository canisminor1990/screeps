import { Manager } from './Manager';
import { CreepManager } from './Creep';
import { RoomManager } from './Room';
import { SpawnManager } from './Spawn';
import { SourceManager } from './Source';

export class Managers {
	static run() {
		const ManagerList: Manager[] = [new RoomManager(), new SpawnManager(), new SourceManager(), new CreepManager()];

		_.forEach(ManagerList, (manager: Manager) => {
			manager.run();
		});
	}
}
