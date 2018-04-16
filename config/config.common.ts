import { Configuration, DefinePlugin, optimize } from 'webpack';
import { join, resolve } from 'path';
import * as moment from 'moment';
import * as PackageData from '../package.json';
export default (options: EnvOptions): Configuration => {
	const ENV = options.ENV || 'dev';
	const ROOT = options.ROOT || __dirname;
	const PRODUCTION = options.ENV === 'production';
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
	const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	const ScreepsSourceMapToJson = require('../lib/screeps-webpack-sources').default;
	const DefineConfig = {
		ENV: JSON.stringify(ENV),
		BUILD_TIME: JSON.stringify(moment().format('MMMM Do YYYY, h:mm:ss a')),
		BUILD_VERSION: JSON.stringify(PackageData.version),
	};
	return {
		entry: './src/main.ts',
		output: {
			devtoolModuleFilenameTemplate: '[resource-path]',
			filename: '[name].js',
			libraryTarget: 'commonjs2',
			path: join(ROOT, 'dist', ENV),
			pathinfo: false,
			sourceMapFilename: '[file].map.js',
		},
		externals: {
			'main.js.map': 'main.js.map',
			config: 'config',
		},
		node: {
			Buffer: false,
			__dirname: false,
			__filename: false,
			console: true,
			global: true,
			process: false,
		},
		resolve: {
			alias: {
				// 这里需要个app.js里保持一致
				Enum: resolve(ROOT, 'enmu'),
			},
			extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
		},
		devtool: PRODUCTION ? false : 'source-map',
		target: 'node',
		module: {
			rules: [
				{
					test: /\.js$/,
					enforce: 'pre',
					loader: 'source-map-loader',
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
				},
				{
					test: /\.tsx?$/,
					enforce: 'pre',
					loader: 'source-map-loader',
				},
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin([`dist/${options.ENV}/*`], { root: options.ROOT }),
			// new ForkTsCheckerWebpackPlugin({ ignoreDiagnostics: [2451, 2687, 6133] }),
			new CopyWebpackPlugin([{ from: join(ROOT, 'src/config.js') }, { from: join(ROOT, 'src/commands.js') }]),
			new UglifyJsPlugin({ sourceMap: !PRODUCTION }),
			new DefinePlugin(DefineConfig),
			new ScreepsSourceMapToJson(),
		].filter(Boolean),
		watchOptions: {
			ignored: /backup/,
			aggregateTimeout: 300,
		},
	};
};
