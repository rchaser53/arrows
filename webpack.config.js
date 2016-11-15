'use strict';

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const {
	devtool,
	_module,
	externals,
	resolve
} = require('./webpack.common.config');

module.exports = {
	devtool,
	context: path.resolve(__dirname),
	entry: [
		'./example/index.tsx'
	],
	output: {
		path: path.join(__dirname, '/workplace/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve,
	devServer: {
		contentBase: 'dist',
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new ForkCheckerPlugin()
	],
	node:{
		fs:'empty',
		json:'empty',
		console:true,
		net:"empty"
	},
	module: _module,
	externals
};