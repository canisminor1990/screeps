

export default (spawn, my, config) => {
    if (spawn.spawning) return;
    let priority = false;
    let roleFactory = config.role
    roleFactory.forEach(roleType => {
        let roleNmae = roleType.role;
        let roleNumber = roleType.number - my[roleNmae].length;
        if (roleNumber <= 0 || priority) return;
        let spawnName = buildName(roleNmae)
        spawn.createCreep(buildBody(roleType.body), spawnName, {role: roleNmae});
        if (spawn.spawning) {
            console.log('Spawn', spawnName);
            spawn.room.visual.text(
                '[Spawn] ' + spawnName,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        } else {
            priority = true;
        }
    })

}

function buildName(role) {
    const date = new Date();
    return [
        role,
        "#",
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join('')
}

function buildBody(obj) {
    let array = [];
    for (let key in obj) {
        for (let num = 0; num < obj[key]; num++) {
            array.push(key)
        }
    }
    return array;
}
