"use strict";

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const concat = require('gulp-concat')
const gulpif = require('gulp-if')
// const browser = require('browser-sync')

const config = require('../config.js')

/**
 * plugin:js:build
 */
gulp.task('plugin:js:build', (done) =>{
	return gulp.src(gulpif(config.isPrd, config.plugin.js.src_prd , config.plugin.js.src_dev))
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(concat(config.plugin.js.name))
		.pipe(gulp.dest(config.plugin.js.dist))
})

/**
 * plugin:js:watch
 */
gulp.task('plugin:js:watch', (done) => {
	return gulp.watch(config.plugin.js.src_dev, gulp.series('plugin:js:build'))
})