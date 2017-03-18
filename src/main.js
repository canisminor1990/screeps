import {roleConfig, roleHarvester, roleUpgrader, roleBuilder} from './role';
import {taskSpawn} from './task';


module.exports = {

    loop: () => {

        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        taskSpawn(roleConfig.number, roleConfig.body)

        if (Game.spawns['Spawn1'].spawning) {
            const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '[Spawn]' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }



        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            switch (creep.memory.role) {
                case 'harvester':
                    (targets.length > 0) ?
                        roleHarvester.run(creep,targets[0]) : roleBuilder.run(creep);
                    break;
                case 'upgrader':
                    (targets.length > 0) ?
                        roleHarvester.run(creep,targets[0]) : roleUpgrader.run(creep);
                    break;
                case 'builder':
                    (targets.length > 0) ?
                        roleHarvester.run(creep,targets[0]) : roleBuilder.run(creep);
                    break;
            }
        }
    }

}