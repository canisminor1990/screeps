export * from '../backup/Profiler'
export * from '../../src/utils/ErrorMapper'
/**
 * Gets currently visible rooms.
 * Dependant on userscript: {@link https://github.com/Esryok/screeps-browser-ext/blob/master/visible-room-tracker.user.js Visible Room Tracker}
 */
export const getVisibleRooms = (age: number): any[] => {
  const since = Game.time - (age || 5);
  const visibleRooms = [];
  for (const roomName in Memory.rooms) {
    const room = Memory.rooms[roomName];
    if (room.lastViewed && room.lastViewed > since) {
      visibleRooms.push(roomName);
    }
  }
  return visibleRooms;
};

/**
 * formats an integer into a readable value
 */
export const formatNumber = (number: number): string => {
  // @ts-ignore
  let ld = Math.log10(number) / 3;
  if (!number) return number.toString();
  let n = number.toString();
  if (ld < 1) {
    return n;
  }
  if (ld < 2) {
    return n.substring(0, n.length - 3) + 'k';
  }
  if (ld < 3) {
    return n.substring(0, n.length - 6) + 'M';
  }
  if (ld < 4) {
    return n.substring(0, n.length - 9) + 'B';
  }
  return number.toString();
};

/**
 * Pad a number with a character
 */
export const pad = (
  number: number,
  padCharacter: string = '0',
  padLength: number = 2,
  padLengthMax: boolean = true
): string => {
  if (!padCharacter) padCharacter = '0';
  if (padLengthMax) padLength -= number.toString().length;
  const padString = _.times(padLength, n => padCharacter).join('');
  return padString + number;
};

/**
 * Returns the result of the function or the value passed
 */
export const fieldOrFunction = (value: any, ...args: any[]): any => {
  return typeof value === 'function' ? value(...args) : value;
};

/**
 * Gets a property from an object and optionally sets the default
 */
export const get = (
  object: Object,
  path: string,
  defaultValue: any,
  setDefault: boolean = true
): any => {
  const r = _.get(object, path);
  if (_.isUndefined(r) && !_.isUndefined(defaultValue) && setDefault) {
    defaultValue = fieldOrFunction(defaultValue);
    _.set(object, path, defaultValue);
    return _.get(object, path);
  }
  return r;
};

/**
 * Sets a property on an object, optionally if the property doesn't already exist
 */
export const set = (object: Object, path: string, value: any, onlyIfNotExists: boolean = true) => {
  if (onlyIfNotExists) {
    get(object, path, value);
    return;
  }
  _.set(object, path, value);
};

/**
 * Checks if all the arguments passed are equal.
 */
export const areEqual = (...args: any[]): boolean => {
  if (args.length <= 1) return true;
  return args.every((v, i, a) => _.isEqual(v, a[0]));
};

/**
 * Calls a function if it exists
 */
export const callIfExists = (toCall: Function, ...args: any[]): any => {
  if (toCall) return toCall(...args);
};

/**
 * Checks if the value is an object or function
 */
export const isObject = (value: any): boolean => {
  if (value === null) return false;
  return typeof value === 'function' || typeof value === 'object';
};

/**
 * Translates an error code to the type
 */
export const translateErrorCode = (code: number): string => {
  const ErrorCode = [
    'OK', // 0
    'ERR_NOT_OWNER', // 1
    'ERR_NO_PATH', // 2
    'ERR_NAME_EXISTS', // 3
    'ERR_BUSY', // 4
    'ERR_NOT_FOUND', // 5
    'ERR_NOT_ENOUGH_RESOURCES', // 6
    'ERR_INVALID_TARGET', // 7
    'ERR_FULL', // 8
    'ERR_NOT_IN_RANGE', // 9
    'ERR_INVALID_ARGS', // 10
    'ERR_TIRED', // 11
    'ERR_NO_BODYPART', // 12
    'ERR_RCL_NOT_ENOUGH', // 13
    'ERR_GCL_NOT_ENOUGH' // 14
  ];
  return ErrorCode[code * -1];
};

/**
 * Returns a HTML formatted string with the style applied
 */
export const dye = (style: any, ...text: string[]): string => {
  const msg = text.join(' ');
  if (isObject(style)) {
    let css = '';
    const format = (key: string) => (css += `${key}: ${style[key]};`);
    _.forEach(Object.keys(style), format);
    return `<span style="${css}">${msg}</span>`;
  }
  if (style) {
    return `<span style="color: ${style}">${msg}</span>`;
  }
  return msg;
};

/**
 * Logs an error to console
 */
export const logError = (message: string, entityWhere: any = false) => {
  const msg = dye(CRAYON.error, message);
  if (entityWhere) {
    trace('error', entityWhere, msg);
  } else {
    console.log(msg, stack());
  }
};

/**
 * Log an error for a creep's action, given an error code
 */
export const logErrorCode = (creep: Creep, code: number) => {
  let error: string = '';
  const message = `${error}\nroom: ${creep.pos.roomName}\ncreep: ${creep.name}\naction: ${
    creep.data.actionName
  }\ntarget: ${creep.data.targetId}`;
  if (code) {
    error = translateErrorCode(code);
    if (creep) {
      creep.say(error || code.toString());
    }
    Game.notify(message, 120);
  }
  console.log(dye(CRAYON.error, message), stack());
};

/**
 * Log text as a system message showing a "referrer" as a label
 */
export const logSystem = (roomName: string, ...message: string[]) => {
  const text = dye(CRAYON.system, roomName);
  console.log(
    dye(CRAYON.system, `<a href="/a/#!/room/${Game.shard.name}/${roomName}">${text}</a> &gt;`),
    ...message,
    stack()
  );
};

/**
 * Build a stacktrace if DEBUG_STACKS or the first argument is true.
 */
export const stack = (force: boolean = false, placeholder: string = ' ') => {
  if (DEBUG_STACKS || force) {
    return new Error(`\nSTACK; param:${DEBUG_STACKS}, force:${force}`).stack;
  }
  return placeholder;
};

/**
 * Trace an error or debug statement
 * @param {string} category - The error category
 * @param {*} entityWhere - The entity where the error was caused
 * @param {Object|string} message - A string or object describing the error
 */
export const trace = (category: string, entityWhere: any, ...message: any[]) => {
  function reduceMemoryWhere(result, value, key) {
    const setting = Memory.debugTrace[key];
    if (!Reflect.has(Memory.debugTrace, key)) {
      return result;
    } else if (result) {
      return setting === value || (!value && setting === `${value}`);
    }
    return false;
  }

  const noMemoryWhere = (e):boolean => {
    const setting = Memory.debugTrace.no[e[0]];
    return (
      setting === true ||
      (e[0] in Memory.debugTrace.no && (setting === e[1] || (!e[1] && setting === `${e[1]}`)))
    );
  }

  if (
    !(Memory.debugTrace[category] === true || _(entityWhere).reduce(reduceMemoryWhere, 1) === true)
  )
    return;
  if (
    Memory.debugTrace.no &&
    _(entityWhere)
      .pairs()
      .some(noMemoryWhere) === true
  )
    return;

  let msg = message;
  let key;
  if (message.length === 0 && category) {
    let leaf = category;
    do {
      key = leaf;
      leaf = entityWhere[leaf];
    } while (entityWhere[leaf] && leaf !== category);

    if (leaf && leaf !== category) {
      if (typeof leaf === 'string') {
        msg = [leaf];
      } else {
        msg = [key, '=', leaf];
      }
    }
  }

  console.log(
    Game.time,
    dye(CRAYON.error, category),
    ...msg,
    dye(CRAYON.birth, JSON.stringify(entityWhere)),
    stack()
  );
};

/**
 * Converts the date to local time
 * @param {Date} date - Server date
 * @returns {Date}
 */
export const toLocalDate = date => {
  if (!date) date = new Date();
  let offset = TIME_ZONE;
  if (USE_SUMMERTIME && isSummerTime(date)) offset++;
  return new Date(date.getTime() + 3600000 * offset);
};

/**
 * Formats the date object to a date-time string
 * @param {Date} date - The date to format
 * @returns {string}
 */
export const toDateTimeString = date => {
  return (
    pad(date.getFullYear(), 0, 4) +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    toTimeString(date)
  );
};

/**
 * Formats the date object to a time string
 * @param {Date} date - The date to format
 * @returns {string}
 */
export const toTimeString = date => {
  return pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
};

/**
 * Checks if it's summertime/daylight savings in the date provided
 * @param {Date} date - A date object to check
 * @returns {Boolean}
 */
export const isSummerTime = date => {
  if (!Reflect.has(Date.prototype, 'stdTimezoneOffset')) {
    Date.prototype.stdTimezoneOffset = function() {
      const jan = new Date(this.getFullYear(), 0, 1);
      const jul = new Date(this.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };
  }
  if (!Reflect.has(Date.prototype, 'dst')) {
    Object.defineProperty(Date.prototype, 'dst', {
      get: function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
      },
      configurable: true
    });
  }

  return date.dst;
};

/**
 * Adds a Game object to an array by providing the object ID
 * @param {Array<*>} array - The array to add the object to
 * @param {string} id - ID string corrosponding to a Game object
 * @returns {Array<*>}
 */
export const addById = (array, id) => {
  if (!array) array = [];
  const obj = Game.getObjectById(id);
  if (obj) array.push(obj);
  return array;
};

/**
 * Sends room statistics via. game email
 */
export const processReports = () => {
  if (
    !_.isUndefined(Memory.statistics) &&
    !_.isUndefined(Memory.statistics.reports) &&
    Memory.statistics.reports.length
  ) {
    let mails;
    if (Memory.statistics.reports.length <= REPORTS_PER_LOOP) {
      mails = Memory.statistics.reports;
      Memory.statistics.reports = [];
    } else {
      mails = Memory.statistics.reports.splice(0, REPORTS_PER_LOOP);
    }
    _.forEach(mails, Game.notify);
  }
};

/**
 * Get the distance between two points.
 * @param {RoomPosition|Object} point1 - The first point
 * @param {RoomPosition|Object} point2 - The second point
 * @returns {Number}
 */
export const getDistance = (point1, point2) => {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

/**
 * Gets the distances between two rooms, respecting natural walls
 * @param {string} fromRoom - Starting room
 * @param {string} toRoom - Ending room
 * @returns {Number}
 */
export const routeRange = (fromRoom, toRoom) => {
  if (fromRoom === toRoom) return 0;

  return get(Memory, `routeRange.${fromRoom}.${toRoom}`, function() {
    const room = fromRoom instanceof Room ? fromRoom : Game.rooms[fromRoom];
    if (!room) return Room.roomDistance(fromRoom, toRoom, false);

    const route = room.findRoute(toRoom, false, false);
    if (!route) return Room.roomDistance(fromRoom, toRoom, false);

    return route === ERR_NO_PATH ? Infinity : route.length;
  });
};

/**
 * Paves the room utilising Brown/Brown Pavement Art flags
 * @param {string} roomName - The room to pave
 */
export const pave = roomName => {
  const flags = _.values(Game.flags).filter(
    f => f.pos.roomName === roomName && f.compareTo(FLAG_COLOR.pavementArt)
  );
  const val = Memory.pavementArt[roomName] === undefinede ? '' : Memory.pavementArt[roomName];
  const posMap = flag => `x${flag.pos.x}y${flag.pos.y}`;
  Memory.pavementArt[roomName] = val + flags.map(posMap).join('') + 'x';
  const setSite = flag => flag.pos.createConstructionSite(STRUCTURE_WALL);
  flags.forEach(setSite);
  const remote = f => f.remove();
  flags.forEach(remove);
};

/**
 * Unpaves the room
 * @param {string} roomName - The room to unpave
 * @returns {Boolean} Whether or not the method was sucessful
 */
export const unpave = roomName => {
  if (!Memory.pavementArt || !Memory.pavementArt[roomName]) return false;
  const room = Game.rooms[roomName];
  if (!room) return false;
  const unpaved = structure =>
    Memory.pavementArt[roomName].indexOf(`x${structure.pos.x}y${structure.pos.y}x`) >= 0;
  const structures = room.structures.all.filter(unpaved);
  const destroy = structure => structure.destroy();
  if (structures) structures.forEach(destroy);
  delete Memory.pavementArt[roomName];
  return true;
};

/**
 * Iterates over all your structures and adds them to a layout array, and returns the JSON.
 * @param {RoomPosition|Object} pos - A room position of the top left corner of the layout
 * @param {Function} [filter] - Optional filter.
 * @returns {string} A JSON string of the room layout.
 */
export const getRoomLayout = (pos, filter) => {
  const layout = [];
  const room = Game.rooms[pos.roomName];
  if (!room) return;
  const startX = pos.x;
  const startY = pos.y;
  _(room.find(FIND_STRUCTURES))
    .reject(s => s instanceof StructureController)
    .filter(s => s.pos.x >= startX && s.pos.y >= startY)
    .filter(s => {
      if (filter) return filter(s);
      return true;
    })
    .value() // for some reason _.set is broken in _.forEach
    .forEach(s => _.set(layout, [s.pos.x - startX, s.pos.y - startY], s.structureType));
  // RegEx Magic
  const replacementMap = {
    null: '',
    '"extension"': 'STRUCTURE_EXTENSION',
    '"road"': 'STRUCTURE_ROAD',
    '"tower"': 'STRUCTURE_TOWER',
    '"spawn"': 'STRUCTURE_SPAWN',
    '"link"': 'STRUCTURE_LINK',
    '"storage"': 'STRUCTURE_STORAGE',
    '"terminal"': 'STRUCTURE_TERMINAL',
    '"nuker"': 'STRUCTURE_NUKER',
    '"powerSpawn"': 'STRUCTURE_POWER_SPAWN',
    '"observer"': 'STRUCTURE_OBSERVER',
    '"rampart"': 'STRUCTURE_RAMPART',
    '"lab"': 'STRUCTURE_LAB'
  };
  const re = new RegExp(Object.keys(replacementMap).join('|'), 'g');
  return JSON.stringify(layout).replace(re, match => replacementMap[match]);
};

/**
 * Generate a GUID. Note: This is not guaranteed to be 100% unique.
 * @returns {string}
 */
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Checks if a specific creep type is in queue, either globally or for a room
 * @param {Object|String} opts - Behaviour if string, else an object with either behaviour, setup, or name. Optionally a room name.
 * @returns {boolean} - True if the creep is in queue somewhere, otherwise false.
 */
export const inQueue = opts => {
  if (!opts) return false;
  // string check
  if (opts.link) opts = { behaviour: opts };
  if (!opts.name && !opts.behaviour && !opts.setup) return false;
  return _(Game.rooms)
    .filter('my')
    .map('memory')
    .map(m => m.spawnQueueHigh.concat(m.spawnQueueMedium, m.spawnQueueLow))
    .flatten()
    .some(q => {
      if (opts.room) if (q.destiny && q.destiny.room !== opts.room) return false;
      if (opts.behaviour)
        return (q.behaviour && q.behaviour === opts.behaviour) || q.name.includes(opts.behaviour);
      if (opts.setup) return q.setup === opts.setup;
    });
};

/**
 * List the current memory usage of a given path in memory in kb
 * @param {string} key - The location in memory to check eg 'rooms.E1S1.statistics'
 * @returns {string}
 */
export const memoryUsage = mem => {
  let string = '';
  let total = 0;
  let biggestKey = '';
  for (const key in mem) {
    if (key.length > biggestKey.length) biggestKey = key;
    const sum = JSON.stringify(mem[key]).length / 1024;
    total += sum;
    string += `<tr><td>${key}</td><td>${_.round(sum, 2)}</td></tr>`;
  }
  string += `<tr><td>Total</td><td>${_.round(total, 2)}</td></tr></table>`;
  const padding = Array(biggestKey.length + 2).join(' ');
  return `<table><tr><th>Key${padding}</th><th>Size (kb)</th></tr>`.concat(string);
};

/**
 * cached map of all the game's resources
 */
export const resources = () =>
  _.memoize(() =>
    _.chain(global)
      .pick((v, k) => k.startsWith('RESOURCE_'))
      .value()
  );

export const valueOrZero = (x: any) => x || 0;

export const chargeScale = (amount: number, min: number, max: number) => {
  // TODO per-room strategy
  if (max === min) {
    if (amount > max) {
      return Infinity;
    } else {
      return -Infinity;
    }
  }
  const chargeScale = 1 / (max - min); // TODO cache

  return (amount - max) * chargeScale + 1;
};
