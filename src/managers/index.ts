import { Manager } from './Manager';
import { MemoryManager } from './Memory';
import { CreepManager } from './Creep';
import { RoomManager } from './Room';
import { SpawnManager } from './Spawn';
import { SourceManager } from './Source';
import { FuelManager } from './Fuel';
import { UpgradeManager } from './Upgrade';
import { BuildManager } from './Build';

export class Managers {
	static run() {
		const ManagerList: Manager[] = [
			new MemoryManager(),
			new RoomManager(),
			new SpawnManager(),
			new SourceManager(),
			new FuelManager(),
			new BuildManager(),
			new UpgradeManager(),
			new CreepManager(),
		];

		_.forEach(ManagerList, (manager: Manager) => {
			manager.run();
		});
	}
}
