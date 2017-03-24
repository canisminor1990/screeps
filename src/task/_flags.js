import {attack, moveTo, dismantle} from '../action'
export default (creep) => {
    const flag = creep.room.find(FIND_FLAGS).sort((a, b) => a.secondaryColor - b.secondaryColor).sort((a, b) => a.color - b.color)[0]
    const name = flag.name;
    if (!name.match(/\//)) flag.remove();
    const pos = flag.pos;
    let command, commandContent;
    command = name.replace('/', '');
    if (name.match(' ')) {
        command = command.match(/[a-z]+ /)
        commandContent = name.replace('/' + command, '')
    }
    let target;
    switch (command) {
        case 'attack' || 'a':
            if (commandContent) {
                target = Game.getObjectById(commandContent.replace(' ',''));
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
        case 'move' || 'moveTo' || 'moveto' || 'm':
            target = (commandContent) ? commandContent : pos
            moveTo(creep, target);
            break;
        case 'chai' || 'dis' || 'dismantle':
            if (commandContent) {
                target = Game.getObjectById(commandContent.replace(' ',''));
                if (dismantle(creep, target[0]))break;
            }
            target = pos.lookFor(LOOK_STRUCTURES)
            if (target.length > 0) {
                if (dismantle(creep, target[0]))break;
            }
            break;
    }
}