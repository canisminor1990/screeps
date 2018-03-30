"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack_sources_1 = require("webpack-sources");
class default_1 {
    apply(compiler) {
        compiler.plugin('emit', (compilation, cb) => {
            for (const filename in compilation.assets) {
                if (path.basename(filename, '.js').match(/\.map/)) {
                    compilation.assets[filename] = new webpack_sources_1.ConcatSource('module.exports = ', compilation.assets[filename]);
                }
            }
            cb();
        });
    }
}
exports.default = default_1;
