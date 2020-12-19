"use strict";

"use strict";

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulpif = require('gulp-if');
// const browser = require('browser-sync')
const config = require('../config.js')

/**
 * styl:build
 */
gulp.task('styl:build', (done)=>{
	return gulp.src(config.css.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(gulpif(!config.isPrd, sourcemaps.init()))
		.pipe(stylus())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulpif(!config.isPrd, sourcemaps.write()))
		.pipe(gulp.dest(config.css.dist));
})

/**
 * styl:watch
 */
gulp.task('styl:watch', (done) =>{
	return gulp.watch(config.css.watch_src, gulp.series('styl:build'))
})
