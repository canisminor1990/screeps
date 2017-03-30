const path     = require('path');
module.exports = {
	entry    : './src/main.js',
	output   : {
		path                         : path.join(__dirname, "dist"),
		filename                     : '[name].js',
		pathinfo                     : true,
		libraryTarget                : 'commonjs2',
		sourceMapFilename            : '[file].map.js',
		devtoolModuleFilenameTemplate: '[resource-path]',
	},
	module   : {
		loaders: [
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				enforce: 'pre',
				query  : {
					presets: [
						require.resolve('babel-preset-react'), // React preset is needed only for flow support.
						require.resolve('babel-preset-es2015'),
						require.resolve('babel-preset-stage-2'),
						require.resolve('screeps-regenerator-preset'), // https://github.com/screepers/screeps-regenerator
					],
					plugins: [
						// require.resolve('babel-plugin-add-module-exports'),
						require.resolve("babel-plugin-dynamic-import-webpack")
					]
				},
			},
		],
	},
};