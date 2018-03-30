"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = (options) => {
    lodash_1.defaults(options, {
        ENV: 'dev',
        ROOT: __dirname,
        TEST: false
    });
    const config = require(`./config/config.${options.ENV}`).default(options);
    return config;
};
