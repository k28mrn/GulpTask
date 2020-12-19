"use strict";

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const wait = require('gulp-wait')
// const browser = require('browser-sync')

const config = require('../config.js')

/**
 * images:copy
 */
gulp.task('images:copy', (done) =>{
	return gulp.src(config.images.src, {base: config.images.base})
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(wait(300))
		.pipe(gulp.dest(config.images.dist))
})

/**
 * images:watch
 */
gulp.task('images:watch', (done) =>{
	return gulp.watch(config.images.src, gulp.series('images:copy'))
})