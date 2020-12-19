"use strict";
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path');
const config = require('./config.js')

console.log(path.resolve(__dirname, "public"));
module.exports = {
	mode: (config.isPrd) ? 'production' : 'development',
	entry: {
		'app': `${config.relativePath}${config.src}assets/js/app.js`,
	},
	output: { 
		filename: 'assets/js/[name].js',
		path: path.resolve(__dirname, "public")
		},
		resolve: { extensions: ['.js', '.json'] },
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [{
						loader: "babel-loader",
						options: {
							presets: [
									// プリセットを指定することで、ES2020 を ES5 に変換
									"@babel/preset-env",
							],
						},
					}],
				},
				{test: /\.json/, exclude: /node_modules/, use: 'json-loader'},
				{test: /\.pug/, exclude: /node_modules/, use:['raw-loader', 'pug-html-loader']},
				{test: /\.html/, exclude: /node_modules/, use: 'html-loader'},
				{test: /\.(vert|frag|glsl)/, exclude: /node_modules/, use:['raw-loader', 'glslify-loader']},
			],
		},
		devServer: {
			contentBase: path.resolve(__dirname, "public"),
		open: true,
		hot: false,
		liveReload: true,
		watchContentBase: true,

	},
	optimization: { minimizer: [] },
	plugins: [],
}

if (!config.isPrd) {
	module.exports['devtool'] = 'inline-source-map'
}


if (config.isPrd) {
	module.exports.plugins.push = new LicenseWebpackPlugin()
	module.exports.optimization.minimizer.push(
		new TerserPlugin({
			terserOptions: {
				compress: {drop_console: true}
			}
		})
	)
}