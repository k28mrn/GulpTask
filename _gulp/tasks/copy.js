"use strict";

const gulp = require('gulp')
// const browser = require('browser-sync')

const config = require('../config.js')

/**
 * copy:json
 */
gulp.task('copy:json', (done) => {
	return gulp.src(config.copy.json.src, {base: config.copy.json.base})
		.pipe(gulp.dest(config.copy.json.dist))
})

/**
 * json:watch
 */
gulp.task('json:watch', (done) => {
	return gulp.watch(config.copy.json.src, gulp.series('copy:json'))
})

/**
 * copy:plugin_css
 */
gulp.task('copy:plugin_css', (done) =>{
	return gulp.src(config.copy.plugin_css.src, {base: config.copy.plugin_css.base})
		.pipe(gulp.dest(config.copy.plugin_css.dist))
})

/**
 * plugin_css:watch
 */
gulp.task('plugin_css:watch', (done) => {
	return gulp.watch(config.copy.plugin_css.src, gulp.series('copy:plugin_css'))
})


