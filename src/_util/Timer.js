export class Timer {

    constructor(tick, func) {
        this.tick = tick;
        this.func = func;
        Memory.timer[tick] = Game.time;
    }

    run() {
        if (Game.time -  Memory.timer[this.tick] < this.tick) return;
        Memory.timer[this.tick] = Game.time;
        this.func(this);
    }

}