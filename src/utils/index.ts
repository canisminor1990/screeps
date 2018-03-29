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

class GameObjectClass {
  getById = (id: string): any => Game.getObjectById(id);

  getByArray = (idArray: string[]): any[] => {
    let GameObjects = [];
    _.forEach(idArray, (id: string) => {
      const v = Game.getObjectById(id);
      if (v != null) GameObjects.push(v);
    });
    return GameObjects;
  };

  getIdArray = (objArray: any[]): string[] => {
    let IdArray = [];
    _.forEach(objArray, (obj: any) => {
      const id = obj.id;
      if (id) IdArray.push(id);
    });
    return IdArray;
  };
}

export const GameObject = new GameObjectClass();
