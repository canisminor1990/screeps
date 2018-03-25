import CommonConfig from './config.common';
import { EnvOptions } from './';
import { Configuration } from 'webpack';
import { merge } from 'lodash';

export default (options: EnvOptions): Configuration => {
  const config: Configuration = CommonConfig(options);

  const macPath =
    '/Users/yangyufan/Library/Application Support/Screeps/scripts/127_0_0_1___21025/default/';
  const winPath = 'C:\\Users\\i\\AppData\\Local\\Screeps\\scripts\\127_0_0_1___21025\\default';

  return merge(config, {
    output: {
      path: process.platform === 'win32' ? winPath : macPath,
      sourceMapFilename: '[file].map.js'
    }
  });
};
