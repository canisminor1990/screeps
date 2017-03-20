export class Timer {

    constructor(tick, func) {
        this.tick = tick;
        this.func = func;
        Memory.timer = Game.time;
    }

    run() {
        if (Game.time -  Memory.timer < this.tick) return;
        Memory.timer = Game.time;
        this.func(this);
    }

}