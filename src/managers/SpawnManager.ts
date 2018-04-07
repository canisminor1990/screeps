import { Manager } from './Manager';
import { getRooms, getCost } from '../utils';
import { RoomType } from '../enums/room';
import { ErrorType } from '../enums/error';

export class SpawnManager extends Manager {
	private uuid: { [type: string]: number };

	constructor() {
		super('SpawnManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			let spawns = room.freeSpawns;
			if (spawns.length > 0) this.spawnQueue(room, spawns);
		});
		this.recordStats();
	}

	private spawnQueue(room: Room, spawns: StructureSpawn[]) {
		if (room.memory.orders === undefined) room.memory.orders = [];
		if (room.memory.orders.length === 0) return; // 订单列表为空则返回
		const spawn = spawns[0];

		// 按优先级排序
		room.memory.orders.sort((a: CreepOrder, b: CreepOrder) => {
			return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
		});

		// 获取订单
		const order = room.memory.orders[0] as CreepOrder;
		const cost = getCost(order.body);
		if (room.energyAvailable < cost) return; // 能量不足则返回
		// get name
		const role = order.memory.role;
		if (_.isUndefined(this.uuid[role])) this.uuid[role] = 0;
		const uuid = this.uuid[role] + 1;
		const name = [role, cost, uuid].join('-') as string;
		const callback = spawn.spawnCreep(order.body, name, {
			memory: {
				...order.memory,
				hasBorn: false,
			},
			// TODO: energyStructures
		}) as number;

		if (callback === OK) {
			// update uuid
			room.memory.orders.shift();
			this.uuid[role] = this.uuid[role] >= 99 ? 0 : uuid;
			Log.room(room, `Spawning: ${name}`);
		} else {
			Log.error(`[${room.name}] ${ErrorType[callback]} with ${name}`);
		}
	}
}
