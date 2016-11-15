const path = require('path');

const {
	devtool,
	_module,
	externals,
	resolve
} = require('./webpack.common.config');

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['mocha'],
		files: [
			'test/**/*.tsx'
		],

		preprocessors: {
			'src/**/*.tsx': ['webpack', 'sourcemap'],
			'test/**/*.tsx': ['webpack', 'sourcemap']
		},

		webpack: {
			devtool,
			resolve,
			module: _module,
			externals
		},

		webpackServer: {
			noInfo: true
		},

		plugins: [
			'karma-webpack',
			'karma-mocha',
			'karma-sourcemap-loader',
			'karma-chrome-launcher'
		],

		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
	})
};