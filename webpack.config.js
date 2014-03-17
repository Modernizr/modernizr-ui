var path = require("path");
var webpack = require("webpack");

module.exports = {
	cache: true,
	entry: './src/js/main.js',
	debug: true,
	devtool: 'sourcemap',
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components'],
	},
	output: {
		path: 'build/',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		]
	}
};