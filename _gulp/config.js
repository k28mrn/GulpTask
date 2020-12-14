"use strict";

const minimist = require('minimist')

const option = minimist(process.argv.slice(2), {})
const CURRENT				= process.cwd()
const RELATIVE_PATH	= "./"
const DIST					= "public/"
const SRC						= "_src/"
const DOCS					= "docs/"

module.exports = {
	isPrd: (option.env == 'prd') ? true : false,
	// 
	// common
	// 
	absolutePath: CURRENT,
	relativePath: RELATIVE_PATH,
	dist: DIST,
	src: SRC,

	// 
	// html
	// 
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

	// 
	// css
	// 
	css: {
		src: [
			`${SRC}assets/**/*.styl`,
			`!${SRC}assets/**/_*.styl`,
		],
		watch_src: [`${SRC}assets/**/*.styl`],
		dist: `${RELATIVE_PATH}${DIST}assets/`
	},
}