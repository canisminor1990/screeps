declare namespace NodeJS {
  interface Global {
    isRoot: boolean | undefined;
    Log: any;
  }
}

declare const Log: LogClass;
interface LogClass {
  dye(style: any, ...text: any[]): string;

  success(...content: any[]): void;

  info(...content: any[]): void;

  error(...content: any[]): void;

  warn(...content: any[]): void;

  system(...content: any[]): void;

  room(roomName: string, ...content: any[]): void;

  debug(content: any): void;
}
