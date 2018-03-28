declare namespace NodeJS {
  interface Global {
    isRoot: any;
    Log: any;
    CMemory: any;

    // Commands
    RootMemory(): any;
  }
}

// CMemory

interface CMemoryClass {
  check(key: string, value: any): void;

  get(key: string): void;

  set(key: string, value: any): void;
}

declare var CMemory: CMemoryClass;

// Log

interface LogClass {
  dye(style: any, ...text: string[]): string;

  success(...content: string[]): void;

  info(...content: string[]): void;

  error(...content: string[]): void;

  warn(...content: string[]): void;

  system(...content: string[]): void;

  room(roomName: string, ...content: string[]): void;

  debug(content: any): void;
}

declare var Log: LogClass;
