"use strict";

const gulp = require('gulp')
const del = require('del')

const config = require('../config')

/**
 * delete:dist
 */
gulp.task('delete:dist', (done) =>{
	return del(config.delete.dist)
})
