export default (creep, target,color = '#ffffff') => {
    if (creep.fatigue > 0) return;
    creep.moveTo(target, {reusePath: 6, visualizePathStyle: {stroke: color}})
}


