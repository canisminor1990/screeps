import config from './config';

export default (spawn) => {

    const number = config.role.number,
        body = config.role.body;

    if (spawn.energy >= 300) {

        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        for (let key in number) {
            const roleSpawn = key;
            for (let i = 0; i < number[key].length; i++) {
                const maxNum = number[key][i]
                const roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn && creep.memory.source == i).length;
                const roleBody = buildBody(body[key])

                if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(roleBody) === OK) {
                    const name = `[${roleSpawn}]${getNowFormatDate()}`
                    Game.spawns['Spawn1'].createCreep(
                        roleBody,
                        name,
                        {role: roleSpawn, source: i}
                    );
                    console.log(['Spawn:',
                        name,
                        'Source:',
                        i].join(' '));
                }
            }
        }

    }

    if (spawn.spawning) {
        const spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '[Spawn]' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }
}


function getNowFormatDate() {
    const date = new Date();
    return [date.getHours(),
        date.getMinutes(),
        date.getSeconds()].join(':')
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