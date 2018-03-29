export abstract class Manager {
  private name: string;

  constructor(name: string) {
    this.name = name;
    CMemory.check(`manager.${this.name}`);
  }

  protected get memory(): any {
    CMemory.check(`manager.${this.name}`);
    return Memory.sources[this.name];
  }

  protected set memory(value: any): void {
    CMemory.check(`manager.${this.name}`);
    Memory.sources[this.name] = value;
  }
}
