"use strict";

const gulp = require('gulp')
const requireDir = require('require-dir')
const childProcess = require('child_process')

const config = require('./config.js')
const spawn = childProcess.spawn

requireDir("./_gulp/")

/**
 * デフォルトタスク
 * 
 * npm start - 開発タスク
 * npm run prd - 本番用ビルドタスク
 */
gulp.task('default', (done)=>{
	let process = undefined
	if (config.isPrd) {
		process = spawn('gulp', ['_prd', '--env', 'prd'], {stdio: "inherit"})
	} else {
		process = undefined
		const restart = ()=>{
			if (typeof process != "undefined") {
				process.kill()
			}
			process = spawn("gulp", ["_dev", '--env', 'dev'], {stdio: "inherit"})
		}

		gulp.watch(['gulpfile.js','./_gulp/**/*.js'], restart)
		restart()
	}
	done();
})

/**
 * 開発タスク
 */
gulp.task('_dev', gulp.series(
	gulp.parallel(
		'delete:dist',
	),
	gulp.parallel(
		'copy:json',
		'copy:plugin_css',
		'images:copy',
	),
	gulp.parallel(
		// 'styl:build',
		'sass:build',
		'pug:build',
		'plugin:js:build',
		'webpack:build',
	),
	gulp.parallel(
		'pug:watch',
		// 'styl:watch',
		'sass:watch',
		'plugin:js:watch',
		'images:watch',
		'json:watch',
		'plugin_css:watch',
		'webpack:devServer',
	),
));

/**
 * 本番用ビルドタスク
 */
gulp.task('_prd', gulp.series(
	gulp.parallel(
		'delete:dist',
	),
	gulp.parallel(
		'copy:json',
		'copy:plugin_css',
		'images:copy',
	),
	gulp.parallel(
		// 'styl:build',
		'sass:build',
		'pug:build',
		'plugin:js:build',
		'webpack:build',
	),
));
