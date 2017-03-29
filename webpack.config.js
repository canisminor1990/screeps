const path     = require('path');
module.exports = {
	entry    : './src/main.js',
	output   : {
		path                         : path.join(__dirname, "dist"),
		filename                     : '[name].js',
		pathinfo                     : true,
		libraryTarget                : 'commonjs2',
		sourceMapFilename            : '[file].map.js', // normally this is [file].map, but we need a js file, or it will be rejected by screeps server.
		devtoolModuleFilenameTemplate: '[resource-path]',
	},
	target   : 'node',
	node     : {
		console   : true,
		global    : true,
		process   : false,
		Buffer    : false,
		__filename: false,
		__dirname : false,
	},
	resolve  : {extensions: ['.js']},// Add '.ts' and '.tsx' as resolvable extensions.
	externals: [{'main.js.map': './main.js.map',},],
	module   : {
		loaders: [
			{
				test   : /\.js$/,
				loader : 'babel-loader?source-map-loader',
				enforce: 'pre',
				query  : {
					presets: [
						require.resolve('babel-preset-react'), // React preset is needed only for flow support.
						require.resolve('babel-preset-es2015'),
						require.resolve('babel-preset-stage-2'),
						require.resolve('screeps-regenerator-preset'), // https://github.com/screepers/screeps-regenerator
					],
					plugins: [
						require.resolve('babel-plugin-add-module-exports'),
						require.resolve("babel-plugin-dynamic-import-webpack")
					]
				},
			},
		],
	},
};