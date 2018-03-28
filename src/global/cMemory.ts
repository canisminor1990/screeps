export class CMemoryClass {
  get = (key: string) => _.get(Memory, key);
  set = (key: string, value: any) => _.set(Memory, key, value);

  check = (key: string, value: any) => {
    if (this.get(key) === undefined) {
      this.set(key, value);
    }
  };
}
