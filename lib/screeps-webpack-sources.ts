import * as path from 'path';
import { Compiler, Plugin } from 'webpack';
import { ConcatSource } from 'webpack-sources';

// Tiny tiny helper plugin that prepends "module.exports = " to all `.map` assets
export default class implements Plugin {
  public apply(compiler: Compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      for (const filename in compilation.assets) {
        // matches any files ending in ".map" or ".map.js"
        if (path.basename(filename, '.js').match(/\.map/)) {
          compilation.assets[filename] = new ConcatSource(
            'module.exports = ',
            compilation.assets[filename]
          );
        }
      }
      cb();
    });
  }
}
