import { LogLevel } from '../enums/loglevel';

export const Dye = (style: any, ...text: any[]): string => {
  const Color = {
    [COLOR_RED]: '#F92672',
    [COLOR_PURPLE]: '#AE81FF',
    [COLOR_BLUE]: '#66D9EF',
    [COLOR_CYAN]: '#529B2F',
    [COLOR_GREEN]: '#A6E22E',
    [COLOR_YELLOW]: '#E6DB74',
    [COLOR_ORANGE]: '#FD971F',
    [COLOR_BROWN]: '#75715E',
    [COLOR_GREY]: '#888888',
    [COLOR_WHITE]: '#F8F8F0'
  };
  const Style = {
    ...Color,
    black: { color: 'black', fontWeight: 'bold' },
    system: { color: Color[COLOR_GREY], fontSize: '9px' },
    success: { color: Color[COLOR_GREEN], fontSize: '9px' },
    error: { color: Color[COLOR_RED], fontSize: '9px' },
    warn: { color: Color[COLOR_ORANGE], fontSize: '9px' },
    info: { color: Color[COLOR_BLUE], fontSize: '9px' },
    debug: { color: Color[COLOR_BROWN], fontSize: '9px' },
    room: { color: Color[COLOR_PURPLE], fontSize: '9px' }
  };
  style = Style[style];
  const msg = text.join(' ');
  if (_.isObject(style)) {
    let css = '';
    const format = (value: string | number, key: string) => {
      css += `${_.kebabCase(key)}: ${value};`;
    };
    _.forEach(style, format);
    return `<span style="${css}">${msg}</span>`;
  } else {
    return `<span style="color: ${style}">${msg}</span>`;
  }
};

export class Log {
  static success(...content: any[]): void {
    console.log(Dye('success', '[SUCCESS]'), Dye(COLOR_GREEN, ...content));
  }

  static error(...content: any[]): void {
    if (LogLevel[LOG_LEVEL] < 2) return;
    console.log(Dye('error', '[ERROR]'), Dye(COLOR_RED, ...content));
  }

  static warn(...content: any[]) {
    if (LogLevel[LOG_LEVEL] < 3) return;
    console.log(Dye('warn', '[WARN]'), Dye(COLOR_ORANGE, ...content));
  }

  static info(...content: any[]): void {
    if (LogLevel[LOG_LEVEL] < 4) return;
    console.log(Dye('info', '[INFO]'), Dye(COLOR_BLUE, ...content));
  }

  static debug(...content: any[]): void {
    if (LogLevel[LOG_LEVEL] < 5) return;
    console.log(Dye('debug', '[DEBUG]'), ...content);
  }

  static module(title: string, ...content: any[]): void {
    console.log(Dye('system', `[${title}]`), ...content);
  }

  static room(room: Room, ...content: any[]) {
    console.log(Dye('room', room.print), ...content);
  }

  static stringify(content: any): void {
    console.log('----------------------------------------------');
    console.log(JSON.stringify(content, null, 2));
    console.log('----------------------------------------------');
  }
}
