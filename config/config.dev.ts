import CommonConfig from './config.common';
import { Configuration } from 'webpack';
import _ from 'lodash';

export default (options: EnvOptions): Configuration => {
  const webpackConfig: Configuration = CommonConfig(options);
  const config: Config = require('./config.json');
  const ScreepsWebpackPlugin = require('screeps-webpack-plugin');
  if (!config.branch) config.branch = 'dev';

  return _.merge(webpackConfig, {
    plugins: [new ScreepsWebpackPlugin(config)],
  });
};
