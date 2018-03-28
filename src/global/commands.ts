export class CommandClass {
  public init = () => {
    global.RootMemory = this.RootMemory;
  };

  public RootMemory = (): void => {
    _.forEach(Object.keys(Memory), (key: string) => delete Memory[key]);
    Log.error('* * * * * Memory Root * * * * *');
  };
}

export const Command = new CommandClass();
