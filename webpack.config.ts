import {defaults} from 'lodash';
import * as webpack from 'webpack';
import * as Config from 'webpack-chain';
// import * as path from 'path';

import { EnvOptions } from './config';


export default (options: EnvOptions): webpack.Configuration => {

  defaults(options, {
    ENV: 'dev',
    ROOT: __dirname,
    TEST: false
  });

  const config: Config = require(`./config/config.${options.ENV}`).default(options);

  return config.toConfig() as webpack.Configuration;
}
