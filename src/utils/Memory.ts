export class MemoryClass {
  key: string;
  defaultValue: any;
  memory: any;

  constructor() {
    this.key = '';
    this.defaultValue = null;
  }

  pull = () => (this.memory = Memory[this.key] ? _.get(Memory, this.key) : this.defaultValue);
  push = () => (Memory[this.key] = this.memory);
}
