export default (tick) => {
    if (!Memory.timer) Memory.timer = {};
    if (Memory.timer[tick] && Game.time - Memory.timer[tick] < tick) return false;
    Memory.timer[tick] = Game.time;
    return true
}