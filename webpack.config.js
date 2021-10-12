"use strict";
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const TerserPlugin = require('terser-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path');
const config = require('./config.js')

module.exports = {
	mode: (config.isPrd) ? 'production' : 'development',
	entry: {
		app: `${config.relativePath}${config.src}assets/js/app.ts`,
	},
	output: { 
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, `${config.dist}assets/js`),
	},
	resolve: { extensions: ['.js', '.ts', '.json'] },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [{
					loader: "babel-loader",
					options: {
						presets: [
								// プリセットを指定することで、ES2020 を ES5 に変換
								"@babel/preset-env",
						],
						plugins: [ 
							"@babel/plugin-proposal-class-properties" 
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
		contentBase: path.resolve(__dirname, config.dist.replace('/', '')),
		publicPath: '/assets/js/',
	},
	optimization: { minimizer: [] },
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:3100/',
			ghostMode: false,
			files: [
				path.resolve(__dirname, config.dist + '**/*')
			]
		}, {
			reload: true
		})
	],
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
