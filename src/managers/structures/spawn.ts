import { Manager } from '../index';
import { RoomUtils } from '../../utils/RoomUtils';
import { SetupUtils } from '../../utils/SetupUtils';
import { Order } from '../../classes/Order';
import { ErrorType } from '../../enums/error';

class SpawnManager extends Manager {
  constructor() {
    super('SpawnManager');
  }

  public run(): void {
    _.forEach(RoomUtils.getSpawnRooms(), (room: Room) => {
      let spawns = room.getFreeSpawn();
      if (spawns.length > 0) this.spawnQueue(room, spawns);
    });
  }

  private spawnQueue(room: Room, spawns: StructureSpawn[]) {
    if (room.memory.orders === undefined) room.memory.orders = [];
    if (room.memory.orders.length === 0) return; // 订单列表为空则返回

    const spawn = spawns[0];

    // 按优先级排序
    room.memory.orders.sort((a: Order, b: Order) => {
      return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
    });

    // 获取订单
    const order = room.memory.orders[0] as Order;

    const cost = SetupUtils.getCost(order.body);
    if (room.energyAvailable < cost) return; // 能量不足则返回

    // get name
    const role = SetupUtils.makeRoleName(order.memory.role);
    CMemory.check(`uuid.${role}`, 0);
    const uuid = CMemory.get(`uuid.${role}`) + 1;
    const name = [role, cost, uuid].join('-') as string;

    const callback = spawn.spawnCreep(order.body, name, {
      memory: order.memory
      // TODO: energyStructures
    }) as number;

    if (callback === OK) {
      // update uuid
      room.memory.orders.shift()(uuid >= 99)
        ? CMemory.set(`uuid.${role}`, 0)
        : CMemory.set(`uuid.${role}`, uuid);

      // // update count
      // if (room.memory.typeCount === undefined) room.memory.typeCount = {}
      // const count = room.memory.typeCount[order.memory.role]
      // if (count === undefined) room.memory.typeCount[order.memory.role] = 0
      // room.memory.typeCount[order.memory.role] = count + 1

      // console
      Log.room(room.name, `Spawning: ${name}`);
    } else {
      Log.error(`[${room.name}] ${ErrorType[callback]} with ${name}`);
    }
  }
}
