import * as Config from '../../config';
import * as harvester from './roles/harvester';

/**
 * Initialization scripts for CreepManager module.
 *
 * @export
 * @param {Room} room
 */
export function run(room: Room): void {
  const creeps: Creep[] = room.find(FIND_MY_CREEPS);
  const creepCount = _.size(creeps);

  _buildMissingCreeps(room, creeps);

  _.each(creeps, (creep: Creep) => {
    if (creep.memory.role === 'harvester') {
      harvester.run(creep);
    }
  });
}

/**
 * Creates a new creep if we still have enough space.
 *
 * @param {Room} room
 */
function _buildMissingCreeps(room: Room, creeps: Creep[]) {
  let bodyParts: BodyPartConstant[];

  // Iterate through each creep and push them into the role array.
  const harvesters = _.filter(creeps, creep => creep.memory.role === 'harvester');

  const spawns: StructureSpawn[] = room.find(FIND_MY_SPAWNS, {
    filter: (spawn: StructureSpawn) => {
      return spawn.spawning === null;
    }
  });

  if (harvesters.length < 2) {
    if (harvesters.length < 1 || room.energyCapacityAvailable <= 800) {
      bodyParts = [WORK, WORK, CARRY, MOVE];
    } else if (room.energyCapacityAvailable > 800) {
      bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
    }

    _.each(spawns, (spawn: StructureSpawn) => {
      _spawnCreep(spawn, bodyParts, 'harvester');
    });
  }
}

/**
 * Spawns a new creep.
 *
 * @param {Spawn} spawn
 * @param {BodyPartConstant[]} bodyParts
 * @param {string} role
 * @returns
 */
function _spawnCreep(spawn: StructureSpawn, bodyParts: BodyPartConstant[], role: string) {
  const uuid: number = Memory.uuid;
  let status: number | string = spawn.canCreateCreep(bodyParts, undefined);

  const properties: CreepMemory = {
    role,
    room: spawn.room.name,
    working: false
  };

  status = _.isString(status) ? OK : status;
  if (status === OK) {
    Memory.uuid = uuid + 1;
    const creepName: string = spawn.room.name + ' - ' + role + uuid;

    status = spawn.createCreep(bodyParts, creepName, properties);

    return _.isString(status) ? OK : status;
  } else {
    return status;
  }
}
