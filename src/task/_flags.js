import {attack, moveTo, dismantle} from '../action'
export default (creep, flag) => {
    const name = flag.name;
    if (!name.match(/\//)) flag.remove();
    const pos = flag.pos;
    let command, commandContent;
    command = name.replace('/', '');
    if (name.match(' ')) {
        command = command.split(' ')[0]
        commandContent = command.split(' ')[1];
    }
    let target;
    switch (command) {
        case 'attack':
            if (commandContent) {
                target = Game.getObjectById(commandContent);
                if (attack(creep, target[0]))break;
            }
            target = pos.lookFor(LOOK_CREEPS)
            if (target.length > 0) {
                if (attack(creep, target[0]))break;
            }
            target = pos.lookFor(LOOK_STRUCTURES)
            if (target.length > 0) {
                if (attack(creep, target[0]))break;
            }
            break;
        case 'moveTo':
            target = (commandContent) ? Game.getObjectById(commandContent) : pos
            moveTo(creep, target);
            break;
        case 'dismantle':
            if (commandContent) {
                target = Game.getObjectById(commandContent);
                if (dismantle(creep, target[0]))break;
            }
            target = pos.lookFor(LOOK_STRUCTURES)
            if (target.length > 0) {
                if (dismantle(creep, target[0]))break;
            }
            break;
    }
}