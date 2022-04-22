"use strict";

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
// const browser = require('browser-sync')
const config = require('../config.js');

/**
 * styl:build
 */
gulp.task('styl:build', (done) => {
	return gulp.src(config.stylus.src)
		.pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
		.pipe(gulpif(!config.isPrd, sourcemaps.init()))
		.pipe(stylus())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulpif(!config.isPrd, sourcemaps.write()))
		.pipe(rename({ suffix: '.bundle' }))
		.pipe(gulp.dest(config.stylus.dist));
});

/**
 * styl:watch
 */
gulp.task('styl:watch', (done) => {
	return gulp.watch(config.stylus.watch_src, gulp.series('styl:build'));
});


/**
 * sass:build
 */
gulp.task('sass:build', (done) => {
	return gulp.src(config.sass.src)
		.pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
		.pipe(gulpif(!config.isPrd, sourcemaps.init()))
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulpif(!config.isPrd, sourcemaps.write()))
		.pipe(rename({ suffix: '.bundle' }))
		.pipe(gulp.dest(config.sass.dist));
});

/**
 * sass:watch
 */
gulp.task('sass:watch', (done) => {
	return gulp.watch(config.sass.watch_src, gulp.series('sass:build'));
});
