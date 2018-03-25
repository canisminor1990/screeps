import { existsSync } from 'fs';
import { join } from 'path';
import { Configuration, DefinePlugin, NoEmitOnErrorsPlugin } from 'webpack';
import ScreepsSourceMapToJson from './screeps-webpack-sources';
import { EnvOptions } from './';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const git = require('git-rev-sync');

export default (options: EnvOptions): Configuration => {
  const ENV = options.ENV || 'dev';
  const ROOT = options.ROOT || __dirname;
  const gitRepoExists = existsSync('../.git');

  return {
    entry: {
      main: ['screeps-regenerator-runtime/runtime', './src/main.js']
    },
    output: {
      path: join(ROOT, 'dist', ENV),
      filename: 'main.js',
      pathinfo: false,
      libraryTarget: 'commonjs2',
      sourceMapFilename: '[file].map',
      devtoolModuleFilenameTemplate: '[resource-path]'
    },
    externals: {
      'main.js.map': 'main.js.map'
    },
    node: {
      Buffer: false,
      __dirname: false,
      __filename: false,
      console: true,
      global: true,
      process: false
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader'
            }
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: [join(ROOT, 'src/snippets')],
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([`dist/${options.ENV}/*`], { root: options.ROOT }),
      new DefinePlugin({
        PRODUCTION: JSON.stringify(options.ENV === 'production'),
        __BUILD_TIME__: JSON.stringify(Date.now()), // example defination
        __REVISION__: gitRepoExists ? JSON.stringify(git.short()) : JSON.stringify('')
      }),
      new ScreepsSourceMapToJson(),
      new NoEmitOnErrorsPlugin()
    ].filter(Boolean),
    watchOptions: {
      ignored: /backup/,
      aggregateTimeout: 300
    }
  };
};
