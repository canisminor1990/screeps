import { join } from 'path';
import { Configuration, DefinePlugin } from 'webpack';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export default (options: EnvOptions): Configuration => {
  const ENV = options.ENV || 'dev';
  const ROOT = options.ROOT || __dirname;
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const ScreepsSourceMapToJson = require('../lib/screeps-webpack-sources').default;
  const DefineConfig = {
    PRODUCTION: JSON.stringify(options.ENV === 'production'),
    __BUILD_TIME__: JSON.stringify(Date.now()),
  };
  return {
    entry: {
      main: ['screeps-regenerator-runtime/runtime', './src/main.js'],
      // config:'./src/config.js'
    },
    output: {
      devtoolModuleFilenameTemplate: '[resource-path]',
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: join(ROOT, 'dist', ENV),
      pathinfo: false,
      sourceMapFilename: '[file].map',
    },
    externals: {
      'main.js.map': 'main.js.map',
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
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    devtool: 'source-map',
    target: 'node',
    module: {
      loaders: [
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
          exclude: [join(ROOT, 'src/snippets')],
          loader: 'ts-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([`dist/${options.ENV}/*`], { root: options.ROOT }),
      new ForkTsCheckerWebpackPlugin(),
      new DefinePlugin(DefineConfig),
      new ScreepsSourceMapToJson(),
    ].filter(Boolean),
    watchOptions: {
      ignored: /backup/,
      aggregateTimeout: 300,
    },
  };
};
