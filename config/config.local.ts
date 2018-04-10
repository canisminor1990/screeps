import { merge } from 'lodash';
import { Configuration } from 'webpack';
import CommonConfig from './config.common';

export default (options: EnvOptions): Configuration => {
	const webpackConfig: Configuration = CommonConfig(options);
	const config: Config = require('./config.json');
	return merge(webpackConfig, {
		output: {
			path: process.platform === 'win32' ? config.winPath : config.macPath,
		},
	});
};
