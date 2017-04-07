import Config from '../config';
export default (role = '', number = 0, roomName = '', roomType) => {
	try {
		const room = Memory.rooms[roomName],
		      task = Memory.tasks[roomName];
		if (roomType == 'main') {
			switch (role) {
				case  'terminer':
					number = (Game.rooms[roomName].storage.store.energy > (Config.terminal.storage + 50000)) ? number : 0;
					break;
				case 'filler':
					number = (room.structures.my.storage.length > 0)
						? number
						: 0;
					break;
				case 'upfiller':
					number = (Memory.flags[roomName].up)
						? number
						: 0;
					break;
				case 'cleaner':
					number = (task.pickup.length > 0) ? number : 0;
					break;
				case 'transer':
					const miner = task.harvest.length,
					      link  = room.structures.my.link.length;
					if (link > 0) {
						number = number * (miner - link + 1);
						number = (number > 0) ? number : 1;
					} else {
						number = number * miner;
					}
					break;
				case 'miner':
					number = task.harvest.length * number;
					break;
				case 'builder':
					number = Math.ceil(task.build.length / 4);
					number = (number > 4) ? 4 : number;
			}
		} else {
			const claimer = room.creeps.my.claimer.length;
			switch (role) {
				// case 'claimer':
				// 	break
				case 'attacker':
					number = task.attack.length * number;
					break;
				case 'miner':
					number = (claimer > 0) ? task.harvest.length * number : 0;
					break;
				case 'transer':
					if (task.withdraw.length > 0) {
						const miner = task.harvest.length;
						number      = (claimer > 0) ? number * miner : 0;
					} else {
						number = 0;
					}
					break;
				case 'builder':
					number = (claimer > 0 && (task.build.length > 0 || task.repair.length > 0)) ? number : 0;
					break;
			}
		}
	} catch (e) {
		number = 0;
	}
	return (number > 0 ) ? number : 0;
};
