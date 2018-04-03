interface GrafanaMemory {
  name: string;
  storage: any;
  terminal: any;
  controller: any;
  energy: any;
  store: any;
  resources: any;
}

class GrafanaCalss {
  run() {
    Memory.stats = { tick: Game.time };
    Memory.stats.cpu = Game.cpu;
    Memory.stats.cpu.used = Game.cpu.getUsed();
    Memory.stats.gcl = Game.gcl;
    Memory.stats.market = {
      credits: Game.market.credits,
      numOrders: Game.market.orders ? Object.keys(Game.market.orders).length : 0
    };
    // ROOMS
    Memory.stats.rooms = {} as GrafanaMemory;
    for (let roomName in Game.rooms) {
      const room = Game.rooms[roomName] as Room;
      if (!room) continue;
      if (!room.controller || !room.controller.my) continue;
      Memory.stats.rooms[room.name] = {
        name: room.name,
        storage: {},
        terminal: {},
        controller: {},
        energy: {}
      };

      this.init(room, Memory.stats.rooms[room.name]);
    }
  }

  init(room: Room, object: GrafanaMemory) {
    this.controller(room, object);
    this.energy(room, object);
    this.storage(room, object.storage);
    this.terminal(room, object.terminal);
  }

  controller(room: Room, object: GrafanaMemory) {
    if (room.controller) {
      object.controller = {
        level: room.controller.level,
        progress: room.controller.progress,
        progressTotal: room.controller.progressTotal
      };
    }
  }

  energy(room: Room, object: GrafanaMemory) {
    object.energy = {
      available: room.energyAvailable,
      capacityAvailable: room.energyCapacityAvailable
    };
  }

  storage(room: Room, object: GrafanaMemory) {
    const storage = room.storage as StructureStorage | undefined;
    if (storage) {
      object.store = _.sum(storage.store);
      object.resources = storage.store;
    }
  }

  terminal(room: Room, object: GrafanaMemory) {
    const terminal = room.terminal as StructureTerminal | undefined;
    if (terminal) {
      object.store = _.sum(terminal.store);
      object.resources = terminal.store;
    }
  }
}

export const Grafana = new GrafanaCalss();
