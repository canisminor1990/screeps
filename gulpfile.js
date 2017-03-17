var gulp  = require("gulp");
var babel = require("gulp-babel");

function createBabelConfig(babelEnv) {
	const es2015Preset = require('./es2015Preset');
	return {
		presets: [
			babelEnv === 'es' ? es2015Preset.es : es2015Preset.cjs, // 使用自定义的babel-preset-es2015
			'babel-preset-stage-0',
			'babel-preset-react',
		],
		plugins: [
			'babel-plugin-transform-runtime',
			"babel-plugin-dev-expression", // 替换 __DEV__  invariant warning
			'babel-plugin-add-module-exports',  // 解决es6 export default问题
			'babel-plugin-transform-decorators-legacy', // 支持装饰器
			"babel-plugin-transform-react-remove-prop-types", // 生产环境移除propTypes
			"babel-plugin-lodash", // 优化缩减lodash
			"babel-plugin-loop-optimizer" // map, forEach
		]
	};
}

gulp.task("default", function () {
	return gulp.src(['src/**/*.js'])
	           .pipe(babel(createBabelConfig('cjs')))
	           // .pipe(gulpEs3ify())
	           .pipe(gulp.dest('dist'));
});