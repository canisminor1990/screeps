import { defaults } from 'lodash';
import * as webpack from 'webpack';
import { EnvOptions } from './config';

export default (options: EnvOptions): webpack.Configuration => {
  defaults(options, {
    ENV: 'dev',
    ROOT: __dirname,
    TEST: false
  });

  const config = require(`./config/config.${options.ENV}`).default(options);

  return config;
};
