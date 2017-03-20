export class Timer {

    constructor(tick, func) {
        this.tick = tick;
        this.func = func;
    }

    run() {
        if (Memory.timer[this.tick] && Game.time - Memory.timer[this.tick] < this.tick) return;
        this.func(this);
        Memory.timer[this.tick] = Game.time
    }

}