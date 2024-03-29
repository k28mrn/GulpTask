"use strict";

const minimist = require('minimist');

const option = minimist(process.argv.slice(2), {});
const CURRENT = process.cwd();
const RELATIVE_PATH = "./";
const DIST = "public/";
const SRC = "_src/";
const DOCS = "docs/";

module.exports = {
	isPrd: (option.env == 'prd') ? true : false,

	/**
	 * common
	 */
	absolutePath: CURRENT,
	relativePath: RELATIVE_PATH,
	dist: DIST,
	src: SRC,

	/**
	 * js
	 */
	js: {
		dist: DIST,
		serverName: "bs",
	},

	/**
	 * html
	 */
	html: {
		src: [
			`${RELATIVE_PATH}${SRC}**/*.pug`,
			`!${RELATIVE_PATH}${SRC}**/_*.pug`
		],
		watch_src: [`${RELATIVE_PATH}${SRC}**/*.pug`],
		dist: DIST,
		options: {
			pretty: true
		}
	},

	/**
	 * css
	 */
	stylus: {
		src: [
			`${SRC}assets/**/*.styl`,
			`!${SRC}assets/**/_*.styl`,
		],
		watch_src: [`${SRC}assets/**/*.styl`],
		dist: `${RELATIVE_PATH}${DIST}assets/`
	},

	sass: {
		src: [
			`${SRC}assets/**/*.scss`,
			`!${SRC}assets/**/_*.scss`,
		],
		watch_src: [`${SRC}assets/**/*.scss`],
		dist: `${RELATIVE_PATH}${DIST}assets/`
	},

	/**
	 * images
	 */
	images: {
		base: `${SRC}assets/img`,
		src: [
			`${RELATIVE_PATH}${SRC}assets/img/**/*`
		],
		dist: `${RELATIVE_PATH}${DIST}assets/img/`
	},

	/**
	 * plugin
	 */
	plugin: {
		js: {
			src_dev: `${SRC}assets/plugin/**/*.js`,
			src_prd: [ // リリース用 場外ファイルを「!」で定義
				`!${SRC}assets/plugin/stats.min.js`,
				`!${SRC}assets/plugin/dat.gui.min.js`,
				`${SRC}assets/plugin/**/*.js`,
			],
			name: 'plugin.js',
			dist: `${RELATIVE_PATH}${DIST}assets/js/`
		}
	},

	/**
	 * copy
	 */
	copy: {
		json: {
			base: `${SRC}assets/json`,
			src: `${RELATIVE_PATH}${SRC}assets/json/**`,
			dist: `${RELATIVE_PATH}${DIST}assets/json/`,
		},
		plugin_css: {
			base: `${SRC}assets/plugin/css`,
			src: `${RELATIVE_PATH}${SRC}assets/plugin/css/**/*.css`,
			dist: `${RELATIVE_PATH}${DIST}assets/css/`,
		},
	},

	/**
	 * delete
	 */
	delete: {
		dist: `${RELATIVE_PATH}${DIST}`
	},
};
