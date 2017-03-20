export  default (tick) => {
    if (Memory.timer[tick] && Game.time - Memory.timer[tick] < this.tick) return false;
    Memory.timer[tick] = Game.time;
    return true
}