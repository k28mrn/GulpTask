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
// const browser = require('browser-sync')
const config = require('../config.js')

gulp.task('css:build', (done)=>{
	return gulp.src(config.css.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.css.dist));
})