const path                          = require('path'),
      LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports                      = {
	target : 'node',
	entry  : './src/main.js',
	output : {
		path                         : path.join(__dirname, 'dist'),
		filename                     : 'main.js',
		pathinfo                     : true,
		libraryTarget                : 'commonjs2',
		sourceMapFilename            : '[file].map.js',
		devtoolModuleFilenameTemplate: '[resource-path]',
	},
	module : {
		loaders: [
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				enforce: 'pre',
				query  : {
					presets: [
						require.resolve('babel-preset-react'), // React preset is needed only for flow support.
						require.resolve('babel-preset-es2015'),
						require.resolve('screeps-regenerator-preset'), // https://github.com/screepers/screeps-regenerator
					],
					plugins: [
						require.resolve('babel-plugin-lodash'),
						require.resolve('babel-plugin-add-module-exports'),
						require.resolve("babel-plugin-dynamic-import-webpack")
					]
				},
			},
		],
	},
	plugins: [
		new LodashModuleReplacementPlugin,
	]
};