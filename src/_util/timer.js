export class Timer {

    constructor(tick, func) {
        this.tick = tick;
        this.func = func;
        this.last = Game.time;
    }

    run() {
        if (Game.time - this.last < this.tick) return;
        this.last = Game.time;
        this.func(this);
    }

}