const gulp = require("gulp");
const babel = require("gulp-babel");
const buildPreset = require('babel-preset-es2015').buildPreset;
const BabelConfig = {
    presets: [
        [buildPreset, {loose: true, modules: false}],
        'babel-preset-stage-0',
    ],
    plugins: [
        'babel-plugin-transform-runtime',
        'babel-plugin-transform-object-entries',
        "babel-plugin-dev-expression", // 替换 __DEV__  invariant warning
        'babel-plugin-add-module-exports',  // 解决es6 export default问题
        'babel-plugin-transform-decorators-legacy', // 支持装饰器
        "babel-plugin-lodash", // 优化缩减lodash
        "babel-plugin-loop-optimizer" // map, forEach
    ]
};

gulp.task('default', () => {
    gulp.watch([
        'src/**/*.js'
    ], ['js']);
});

gulp.task("test", () => {
    return gulp.src(['temp/src/**/*.js'])
        .pipe(babel(BabelConfig))
        .pipe(gulp.dest('dist'));
});

gulp.task("js", () => {
    return gulp.src(['src/**/*.js'])
        .pipe(babel(BabelConfig))
        .pipe(gulp.dest('dist'));
});