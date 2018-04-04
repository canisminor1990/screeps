export const setTickout = (func: Function, ticks: number): void => {
  if (Game.time % ticks === 0) func();
};

export const getUserName = (): string | undefined => {
  let spawnNames = Object.keys(Game.spawns);
  if (spawnNames.length === 0) {
    return;
  }
  return Game.spawns[spawnNames[0]].owner.username;
};

export const GameObject = new class {
  getById(id: string): RoomObject | null {
    return Game.getObjectById(id);
  }

  getByArray(idArray: string[]): RoomObject[] {
    let GameObjects = [] as RoomObject[];
    _.forEach(idArray, (id: string) => {
      const obj = this.getById(id);
      if (obj !== null) GameObjects.push(obj);
    });
    return GameObjects;
  }

  getIdArray(objArray: any[]): string[] {
    let IdArray = [] as string[];
    _.forEach(objArray, (obj: any) => {
      const id = obj.id;
      if (id) IdArray.push(id);
    });
    return IdArray;
  }
}();
