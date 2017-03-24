import {emoji} from '../_util'
export default (spawn, my, config) => {
    let target = spawn.room.memory.creeps.attacker
    if (target && target.length > 0) {
        console.log(spawn.recycleCreep(target[0]))
    }
    if (spawn.spawning) {
        const percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100),
            text = [emoji.build,
                spawn.spawning.name.split('#')[0],
                `(${percent}%)`].join(' ');
        console.log(text);
        spawn.room.visual.text(
            text,
            spawn.pos.x + 1,
            spawn.pos.y,
            {
                align: 'left',
                stroke: '#111111',
                color: '#ffffff'
            });
        return;
    }

    const roleFactory = config.role
    let priority = false;
    roleFactory.forEach(roleType => {
        const roleName = roleType.role;
        const roleTimeout = (roleType.timeout) ? roleType.timeout : 10;
        const roleMy = _.filter(my[roleName], roleCreep => roleCreep.ticksToLive >= roleTimeout)
        if (roleMy.length - roleType.number >= 0 || priority) return;
        const spawnName = buildName(roleName);
        spawn.createCreep(buildBody(roleType.body), spawnName, {role: roleName, name: spawnName})
        console.log(roleName, 'now:', roleMy.length, 'need:', roleType.number);
        priority = true;
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
