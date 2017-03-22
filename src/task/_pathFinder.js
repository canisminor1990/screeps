export default (creep, target) => {
    if (creep.fatigue > 0) return;
    creep.moveTo(target, {reusePath: 6, visualizePathStyle: {stroke: '#ffffff'}})
}


