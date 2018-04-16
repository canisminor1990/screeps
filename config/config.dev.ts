import CommonConfig from './config.common';
import { Configuration } from 'webpack';
// import { merge } from 'lodash';

export default (options: EnvOptions): Configuration => {
	const webpackConfig: Configuration = CommonConfig(options);
	return webpackConfig;
	// const config: Config = require('./config.json');
	// const ScreepsWebpackPlugin = require('screeps-webpack-plugin');
	// if (!config.branch) config.branch = 'dev';
	//
	// return merge(webpackConfig, {
	// 	plugins: [new ScreepsWebpackPlugin(config)],
	// });
};
