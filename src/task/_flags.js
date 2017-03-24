import {attack, moveTo, dismantle} from '../action'
export default (creep) => {
    let flag = creep.room.memory.flags[0];
    if(!flag) return;
    let name = flag.name;
    if (!name.match(/\//)) flag.remove();
    const pos = flag.pos;
    let command, commandContent;
    command = name.replace('/', '');
    if (name.match(' ')) {
        command = command.match(/[a-z]+ /)
        commandContent = name.replace('/' + command, '')
    }
    console.log(command, commandContent)
    let target;
    switch (command) {
        case 'attack' || 'a':

            target = pos.findClosestByRange(creep.room.memory.creeps.enemy)
            console.log(target)
            if (attack(creep, target))break;
            target = pos.findClosestByRange(creep.room.memory.creeps.enemy)
            if (attack(creep, target))break;
            break;
        case 'move' || 'moveTo' || 'moveto' || 'm':
            if (commandContent) {
                if (moveTo(creep, new RoomPosition(48, 21, commandContent)))break;
            }
            target = pos;
            moveTo(creep, target);
            break;
        case 'chai' || 'dis' || 'dismantle':

            target = pos.findClosestByRange(creep.room.memory.creeps.enemy)
            if (dismantle(creep, target))break;
            break;
    }
}