export class Loop {

    constructor() {
        this.starts = [];
        this.ticks = [];
        this.loops = {};
    }

    start(func) {
        this.starts.push(func);
        return this;
    }

    tick(func) {
        this.ticks.push(func);
        return this;
    }

    every(tick, func) {
        if (tick < 1) return this.tick(func);
        if (!this.loops[tick]) this.loops[tick] = [];
        this.loops[tick].push(func);
        return this;
    }

    getLoop() {
        if (!Memory.loop) Memory.loop = {};
        let loop = Memory.loop;

        if (typeof loop.start !== 'number' || Game.time - loop.start > 10) {
            _.each(this.starts, (func) => func());
            loop.start = Game.time;
            loop.timing = {};
            for (let time in this.loops) loop.timing[time] = Game.time;
        }

        return this.loop.bind(this);
    }

    loop() {
        _.each(this.ticks, (func) => func());

        for (let time in this.loops) {
            if (Game.time - Memory.loop.timing[time] < time) continue;
            Memory.loop.timing[time] = Game.time;
            _.each(this.loops[time], (func) => func());
        }
    }

}