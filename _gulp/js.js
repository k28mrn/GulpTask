"use strict";
const gulp = require('gulp')
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server')

const config = require('../config.js')
const webpackConfig = require('../webpack.config.js')

/**
 * webpack:build
 */
gulp.task('webpack:build', (done)=>{
	webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest(config.js.dist))
	done()
})

/**
 * webpack:devServer
 */
gulp.task('webpack:devServer', (done)=>{
	const compiler = webpack(webpackConfig)
	const server = new webpackDevServer(compiler, webpackConfig.devServer)
	server.listen(3000, "localhost", (err)=>{
		if (err) throw new util.PluginError("webpack-dev-server", err)
	})
	done()
})