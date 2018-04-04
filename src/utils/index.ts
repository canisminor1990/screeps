/**
 * 基于 ticks 的 setTimeout
 */
export const setTickout = (func: Function, ticks: number): void => {
  if (Game.time % ticks === 0) func();
};

/**
 * 获取用户名
 */
export const getUserName = (): string | undefined => {
  let spawnNames = Object.keys(Game.spawns);
  if (spawnNames.length === 0) {
    return;
  }
  return Game.spawns[spawnNames[0]].owner.username;
};

export class getObject {
  /**
   * 1️等同于 Game.getObjectById(id)
   */
  static byId(id: string): RoomObject | null {
    return Game.getObjectById(id);
  }

  /**
   * 1️用 id[] 获取 GameObject[]
   */
  static byIdArray(idArray: string[]): RoomObject[] {
    let GameObjects = [] as RoomObject[];
    _.forEach(idArray, (id: string) => {
      const obj = Game.getObjectById(id) as RoomObject | null;
      if (obj !== null) GameObjects.push(obj);
    });
    return GameObjects;
  }

  /**
   * 1️把 GameObject[] 转换为 id[]
   */
  static toIdArray(objArray: any[]): string[] {
    let IdArray = [] as string[];
    _.forEach(objArray, (obj: any) => {
      const id = obj.id;
      if (id) IdArray.push(id);
    });
    return IdArray;
  }
}
