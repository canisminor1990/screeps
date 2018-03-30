"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_common_1 = require("./config.common");
const lodash_1 = require("lodash");
exports.default = (options) => {
    const config = config_common_1.default(options);
    const ScreepsWebpackPlugin = require('screeps-webpack-plugin');
    const credentials = require('./credentials.json');
    credentials.branch = 'dev';
    return lodash_1.merge(config, {
        plugins: [new ScreepsWebpackPlugin(credentials)]
    });
};
