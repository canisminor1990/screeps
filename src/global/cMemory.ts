export class CMemoryClass {
  private state: Memory = {};
  private isPull: boolean = false;

  public pull = (): void => {
    this.state = Memory;
    this.isPull = true;
  };

  public push = () => {
    if (this.isPull && Object.keys(this.state).length > 0) {
      Memory = this.state;
      this.isPull = false;
    } else {
      Log.error('CMemory: pull first or the state is empty !');
    }
  };

  public get = (key: string): any => {
    return _.get(Memory, key);
  };
  public set = (key: string, value: any): void => {
    _.set(Memory, key, value);
  };

  public delete = (key: string): void => {
    this.set(key, undefined);
  };

  public assign = (key: string, value: any): void => {
    this.set(key, _.assign(this.get(key), value));
  };

  public check = (key: string, value: any): void => {
    if (this.get(key) === undefined) {
      this.set(key, value);
    }
  };
}
