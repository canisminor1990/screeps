export class Loop {

    constructor() {
        this.every = [];
        this.loops = new Map();

        if (!Memory.loop) Memory.loop = {};
        let loop = Memory.loop;

        if (typeof loop.start !== 'number' || Game.time - loop.start > 10) {
            loop.start = Game.time;
            loop.timing = {};
            for (let time of this.loops.keys()) loop.timing['Time: ' + time] = Game.time;
        }
    }

    tick(func) {
        this.every.push(func);
        return this;
    }

    every(tick, func) {
        if (tick < 1) return this.tick(func);
        if (!this.loops.has(tick)) this.loops.set(tick, []);
        this.loops.get(tick).push(func);
        return this;
    }

    getLoop() {
        return this.loop.bind(this);
    }

    loop() {
        _.each(this.every, (func) => func());

        for (let [time, func] of this.loops.keys()) {
            if (Game.time - loop.timing['Time: ' + time] < time) continue;
            loop.timing['Time: ' + time] = Game.time;
            func();
        }
    }

}
