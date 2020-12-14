"use strict";

const gulp = require('gulp')
const requireDir = require('require-dir')
const childProcess = require('child_process')

const config = require('./_gulp/config.js')
const spawn = childProcess.spawn

requireDir("./_gulp/tasks/")

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
		'styl:build',
		'pug:build',
		'plugin:js:build',
	),
	gulp.parallel(
		'pug:watch',
		'styl:watch',
		'plugin:js:watch',
		'json:watch',
		'plugin_css:watch',
	),
));



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
		'styl:build',
		'pug:build',
		'plugin:js:build',
	),
));