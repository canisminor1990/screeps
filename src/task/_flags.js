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
            if (commandContent) {
                target = Game.getObjectById(commandContent.replace(' ', ''));
                if (attack(creep, target[0]))break;
            }
            target = pos.findClosestByRange(creep.room.memory.creeps.enemy,)
            if (target.length) {
                if (attack(creep, target[0]))break;
            }
            target = pos.findClosestByRange(creep.room.memory.creeps.enemy)
            if (target.length) {
                if (attack(creep, target[0]))break;
            }
            break;
        case 'move' || 'moveTo' || 'moveto' || 'm':
            if (commandContent) {
                if (moveTo(creep, new RoomPosition(48, 21, commandContent)))break;
            }
            target = pos;
            moveTo(creep, target);
            break;
        case 'chai' || 'dis' || 'dismantle':
            if (commandContent) {
                target = Game.getObjectById(commandContent.replace(' ', ''));
                if (dismantle(creep, target[0]))break;
            }
            target = pos.findClosestByRange(creep.room.memory.creeps.enemy)
            if (target.length) {
                if (dismantle(creep, target[0]))break;
            }
            break;
    }
}