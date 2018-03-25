import CommonConfig from './config.common';
import { Credentials, EnvOptions } from './';
import { Configuration } from 'webpack';

export default (options: EnvOptions): Configuration => {
  const config: Configuration = CommonConfig(options);
  const ScreepsWebpackPlugin = require('screeps-webpack-plugin');
  const credentials: Credentials = require('./credentials.json');
  credentials.branch = 'dev';

  return _.merge(config, {
    plugins: [new ScreepsWebpackPlugin(credentials)]
  });
};
