import { DefinePlugin, EnvironmentPlugin, IgnorePlugin, optimize } from 'webpack';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import { resolve } from 'path';

const {NODE_ENV} = process.env;
const isDev      = NODE_ENV !== 'production';

export default {
	target      : 'node',
	entry       : {
		main: [
			"screeps-regenerator-runtime/runtime",
			'./src/app.js'
		]
	},
	output      : {
		path         : isDev ? resolve('../Library/Application Support/Screeps/scripts/screeps.com/dev/')
			: resolve('dist'),
		pathinfo     : true,
		libraryTarget: 'commonjs2',
		filename     : '[name].js'
	},
	devtool     : isDev ? 'source-map' : false,
	module      : {
		rules: [
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				use    : [
					{loader: 'babel-loader'},
					{
						loader : 'eslint-loader',
						options: {
							fix: true
						}
					}
				]
			}
		]
	},
	plugins     : [
		new EnvironmentPlugin({NODE_ENV: 'development'}),
		new DefinePlugin({__DEV__: isDev}),
		new optimize.ModuleConcatenationPlugin(),
		!isDev && new MinifyPlugin()
	].filter(Boolean),
	resolve     : {
		modules: [resolve(__dirname, 'src'), 'node_modules']
	},
	watchOptions: {
		ignored         : /dist/,
		aggregateTimeout: 300
	}
};