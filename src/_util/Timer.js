export class Timer {

    constructor(tick, func) {
        this.tick = tick;
        this.func = func;
        Memory.timer = {
            tick: tick,
            timeout: Game.time
        }
    }

    run() {

        this.func(this);
    }

}