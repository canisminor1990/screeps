const taskSpawn = (number,body) => {

    for (let key in number) {

        const roleSpawn = key,
            maxNum = number[key],
            roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
        if (roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key])) {
            const newName = Game.spawns['Spawn1'].createCreep(
                body[key],
                `${roleSpawn}${Math.floor(Math.random() * 100)}`,
                {role: roleSpawn}
            );
            console.log('Spawn: ' + newName);
        }
    }
}

export default taskSpawn;