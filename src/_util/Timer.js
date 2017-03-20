export default (tick, func) => {
    let last = Game.time;
    if (Game.time - last < tick) return
    func;
    last = Game.time;
}