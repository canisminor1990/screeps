import { Manager } from './Manager';
import { getRooms, getCost, makeBodyArray } from '../utils';
import { Setups } from '../creeps/setups';
import { RoomType } from '../enums/room';
import { ErrorType } from '../enums/error';
import { RolePriority } from '../enums/priority';
import { RoleType } from '../enums/creep';

export class SpawnManager extends Manager {
	constructor() {
		super('SpawnManager');
		if (_.isUndefined(this.memory.uuid)) this.memory.uuid = {};
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			this.buildSpawnOrder(room);
			let spawns = room.freeSpawns;
			if (spawns.length > 0) this.spawnQueue(room, spawns);
		});
		this.recordStats();
	}

	private buildSpawnOrder(room: Room): void {
		_.forEach(Setups, setup => {
			const RclSetup = setup.run(room);
			const Role = setup.name as number;
			if (RclSetup.maxCount === 0) return;
			// 检查 房间 + 生产中的数量
			const roomCount = room.getRoleCount(Role);
			const orderCount = _.filter(this.getOrder(room), (o: CreepOrder) => o.memory.role === Role).length;
			// Log.debug('has:', roomCount + orderCount, 'need:', RclSetup.maxCount);
			if (roomCount + orderCount < RclSetup.maxCount) {
				Log.room(room, 'Make spawn order:', RoleType[Role]);
				let Body = makeBodyArray(RclSetup.fixedBody);
				const multiBody = makeBodyArray(RclSetup.multiBody);
				for (let multi = 1; multi <= RclSetup.maxMulti; multi++) {
					Body = Body.concat(multiBody);
				}
				this.createOrder(room, {
					priority: RolePriority[RoleType[Role]],
					body: Body,
					memory: {
						role: Role,
						homeRoom: room.name,
					},
				});
			}
		});
	}

	private getOrder(room: Room): CreepOrder[] {
		if (_.isUndefined(room.memory.orders)) room.memory.orders = [];
		return room.memory.orders;
	}

	private createOrder(room: Room, order: CreepOrder): void {
		room.memory.orders.push(order);
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
		let preUuid = this.memory.uuid[role];
		if (_.isUndefined(preUuid)) preUuid = 0;
		const uuid = preUuid + 1;
		const name = [RoleType[role], cost, uuid].join('-') as string;
		const callback = spawn.spawnCreep(order.body, name, {
			// TODO: energyStructures
		}) as number;

		if (callback === OK) {
			// update uuid
			room.memory.orders.shift();
			Memory.creeps[name] = {
				...order.memory,
				name: name,
				hasBorn: false,
			};
			this.memory.uuid[role] = preUuid >= 99 ? 0 : uuid;
			Log.room(room, `Spawning: ${name}`);
		} else {
			Log.error(`[${room.name}] ${ErrorType[callback]} with ${name}`);
		}
	}
}
