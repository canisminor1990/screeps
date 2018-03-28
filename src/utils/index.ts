export const setTickout = (func: Function, ticks: number) => {
  if (Game.time % ticks === 0) func();
};

export const getUserName = (): string | undefined => {
  let spawnNames = Object.keys(Game.spawns);
  if (spawnNames.length === 0) {
    return;
  }
  return Game.spawns[spawnNames[0]].owner.username;
};
