module.exports = function(grunt) {

	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.UglifyJsPlugin()
				)
			}
		},
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				publicPath: "/" + webpackConfig.output.publicPath
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: "sourcemap",
					debug: true
				}
			}
		},
		execute: {
			// TODO :: pass as a parameter into generate-meta.js 
			// TODO :: decide about the fork of the code
			// options: {
					// outputDir: '../../dist'
				// },
			modernizr: {
				src: ['./node_modules/modernizr/lib/generate-meta.js'],
			}
		}
	});

	grunt.registerTask("default", ["webpack-dev-server:start"]);
	grunt.registerTask("production", ["webpack:build"]);

};
