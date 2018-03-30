"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_common_1 = require("./config.common");
const lodash_1 = require("lodash");
exports.default = (options) => {
    const config = config_common_1.default(options);
    const macPath = '/Users/yangyufan/Library/Application Support/Screeps/scripts/127_0_0_1___21025/default/';
    const winPath = 'C:\\Users\\i\\AppData\\Local\\Screeps\\scripts\\127_0_0_1___21025\\default';
    return lodash_1.merge(config, {
        output: {
            path: process.platform === 'win32' ? winPath : macPath,
            sourceMapFilename: '[file].map.js'
        }
    });
};
