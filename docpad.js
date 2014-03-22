var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');

webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

docpadConfig = {
	outPath: 'dist',
	srcPath: 'src/html',
	plugins: {
		webpack: webpackConfig
	}
};

module.exports = docpadConfig;