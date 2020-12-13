"use strict";

const gulp = require('gulp')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
// const browser = require('browser-sync')

const config = require('../config.js')

gulp.task('pug:build', (done)=>{
	return gulp.src(config.html.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(pug(config.html.options))
		.pipe(gulp.dest(config.html.dist))
})