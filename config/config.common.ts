import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as Config from 'webpack-chain';
import ScreepsSourceMapToJson from './screeps-webpack-sources';
import { EnvOptions } from './types';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const git = require('git-rev-sync');

export function init(options: EnvOptions): Config {
  const ENV = options.ENV || 'dev';
  const ROOT = options.ROOT || __dirname;
  const config = new Config();
  const gitRepoExists = fs.existsSync('../.git');

  config.entry('main').add('./src/main.ts');

  config.output
    .path(path.join(ROOT, 'dist', ENV))
    .filename('main.js')
    .pathinfo(false)
    .libraryTarget('commonjs2')
    .sourceMapFilename('[file].map')
    .devtoolModuleFilenameTemplate('[resource-path]');

  config.devtool('source-map');

  config.target('node');

  config.node.merge({
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: true,
    global: true,
    process: false
  });

  config.watchOptions({ ignored: /node_modules/ });

  config.resolve.extensions.merge(['.webpack.js', '.web.js', '.ts', '.tsx', '.js']);

  config.externals({
    'main.js.map': 'main.js.map'
  });

  // //////
  // Plugins

  config
    .plugin('clean')
    .use(CleanWebpackPlugin, [[`dist/${options.ENV}/*`], { root: options.ROOT }]);

  config.plugin('define').use(webpack.DefinePlugin as Config.PluginClass, [
    {
      PRODUCTION: JSON.stringify(true),
      __BUILD_TIME__: JSON.stringify(Date.now()), // example defination
      __REVISION__: gitRepoExists ? JSON.stringify(git.short()) : JSON.stringify('')
    }
  ]);

  config.plugin('screeps-source-map').use(ScreepsSourceMapToJson as Config.PluginClass);

  config.plugin('no-emit-on-errors').use(webpack.NoEmitOnErrorsPlugin as Config.PluginClass);

  /// //////
  /// Modules

  config.module
    .rule('js-source-maps')
    .test(/\.js$/)
    .enforce('pre')
    .use('source-map')
    .loader('source-map-loader');

  config.module
    .rule('tsx-source-maps')
    .test(/\.tsx?$/)
    .enforce('pre')
    .use('source-map')
    .loader('source-map-loader');

  config.module
    .rule('compile')
    .test(/\.tsx?$/)
    .exclude.add(path.join(ROOT, 'src/snippets'))
    .end()
    .use('typescript')
    .loader('ts-loader')
    .options({
      transpileOnly: true
    });

  return config;
}
