module.exports = function(grunt) {

	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

	grunt.initConfig({
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				publicPath: "/" + webpackConfig.output.publicPath,
				contentBase: './dist'
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
		},
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}
	});

	grunt.registerTask("default", ["webpack-dev-server:start"]);

};
