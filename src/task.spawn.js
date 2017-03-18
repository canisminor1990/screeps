const taskSpawn = (obj) => {

    for (let key in obj) {

        const roleSpawn = key,
            maxNum = obj[key],
            roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
        if (roleNumber < maxNum) {
            const newName = Game.spawns['Spawn1'].createCreep(
                [WORK, CARRY, MOVE],
                `${roleSpawn}${Math.floor(Math.random() * 10)}`,
                {role: roleSpawn}
            );
            console.log('Spawn: ' + newName);
        }
    }
}

export default taskSpawn;