export class LogClass {
  private style = {
    [COLOR_RED]: '#F92672',
    [COLOR_PURPLE]: '#AE81FF',
    [COLOR_BLUE]: '#66D9EF',
    [COLOR_CYAN]: '#529B2F',
    [COLOR_GREEN]: '#A6E22E',
    [COLOR_YELLOW]: '#E6DB74',
    [COLOR_ORANGE]: '#FD971F',
    [COLOR_BROWN]: '#75715E',
    [COLOR_GREY]: '#888888',
    [COLOR_WHITE]: '#F8F8F0',

    black: { color: 'black', fontWeight: 'bold' },
    system: { color: '#999', fontSize: '9px' },
    error: { color: '#F92672', fontSize: '9px' },
    warn: { color: '#FD971F', fontSize: '9px' },
    info: { color: '#66D9EF', fontSize: '9px' },
    room: { color: '#AE81FF', fontSize: '9px' },
    success: { color: '#A6E22E', fontSize: '9px' }
  };

  public dye = (style: any, ...text: any[]): string => {
    const msg = text.join(' ');
    if (_.isObject(style)) {
      let css = '';
      const format = (value: string | number, key: string) =>
        (css += `${_.kebabCase(key)}: ${value};`);
      _.forEach(style, format);
      return `<span style="${css}">${msg}</span>`;
    } else {
      return `<span style="color: ${style}">${msg}</span>`;
    }
  };

  public success = (...content: any[]): void => {
    console.log(
      this.dye(this.style.success, '[SUCCESS]'),
      this.dye(this.style[COLOR_GREEN], ...content)
    );
  };

  public info = (...content: any[]): void => {
    console.log(this.dye(this.style.info, '[INFO]'), this.dye(this.style[COLOR_BLUE], ...content));
  };

  public error = (...content: any[]): void => {
    console.log(this.dye(this.style.error, '[ERROR]'), this.dye(this.style[COLOR_RED], ...content));
  };

  public warn = (...content: any[]) => {
    console.log(
      this.dye(this.style.warn, '[WARN]'),
      this.dye(this.style[COLOR_ORANGE], ...content)
    );
  };

  public system = (title: string, ...content: any[]): void => {
    console.log(this.dye(this.style.system, title), ...content);
  };

  public room = (roomName: string, ...content: any[]) => {
    const title = this.dye(this.style.room, roomName);
    console.log(
      this.dye(this.style.room, `<a href="/a/#!/room/${Game.shard.name}/${roomName}">${title}</a>`),
      ...content
    );
  };

  public debug = (content: any): void => {
    if (_.isObject(content)) {
      console.log(JSON.stringify(content, null, 2));
    } else {
      console.log(content);
    }
  };
}
