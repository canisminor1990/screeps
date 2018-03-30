"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const webpack_1 = require("webpack");
const screeps_webpack_sources_1 = require("./screeps-webpack-sources");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const git = require('git-rev-sync');
exports.default = (options) => {
    const ENV = options.ENV || 'dev';
    const ROOT = options.ROOT || __dirname;
    const gitRepoExists = fs_1.existsSync('../.git');
    return {
        entry: {
            main: ['screeps-regenerator-runtime/runtime', './src/main.js']
        },
        output: {
            path: path_1.join(ROOT, 'dist', ENV),
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
                    exclude: [path_1.join(ROOT, 'src/snippets')],
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
            new webpack_1.DefinePlugin({
                PRODUCTION: JSON.stringify(options.ENV === 'production'),
                __BUILD_TIME__: JSON.stringify(Date.now()),
                __REVISION__: gitRepoExists ? JSON.stringify(git.short()) : JSON.stringify('')
            }),
            new screeps_webpack_sources_1.default(),
            new webpack_1.NoEmitOnErrorsPlugin()
        ].filter(Boolean),
        watchOptions: {
            ignored: /backup/,
            aggregateTimeout: 300
        }
    };
};
