/**
 * Created by zuozhuo on 2017/2/24.
 */
'use strict'

const buildPreset = require('babel-preset-es2015').buildPreset;

const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
    es: {
        presets: [
            [
                buildPreset,
                {
                    loose: true,
                    modules: false
                }
            ]
        ]
    },
    cjs: {
        presets: [
            [
                buildPreset,
                {
                    loose: true,
                    modules: 'commonjs'
                }
            ]
        ]
    }
};