module.exports = function(grunt) {

	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

	// var webpack = require("webpack");
	// var webpackConfig = require("./webpack.config.js");


	grunt.initConfig({
		sass: {
			app: {
				options: {
					sourceMap: 'map',
					includePaths: [
						'./bower_components'
					]
				},
				files: {
					'./build/app.css': './src/css/main.scss'
				}
			}
		},
		// browserify: {
		// 	app: {
		// 		options: {
		// 			debug: true,
		// 			transform: [require('grunt-react').browserify]
		// 		},
		// 		src: './src/js/main.js',
		// 		dest: './build/app.js'
		// 	}
		// },
		// 'webpack-dev-server': {
		// 	options: {
		// 		webpage: webpackConfig,
		// 		publicPath: '/' + webpackConfig.output.publicPath
		// 	},
		// 	start: {
		// 		keepAlive: true,
		// 		webpack: {
		// 			devtool: "eval",
		// 			debug: true
		// 		}
		// 	}
		// },
		// copy: {
		//   main: {
		//     files: [
		//       // includes files within path
		//       {expand: true, src: ['./index.html'], dest: './build', filter: 'isFile'},
		//     ]
		//   }
		// },
		watch: {
			sass: {
				files: ['./src/css/**/*.scss'],
				tasks: ['sass:app']
			}//,
			// app: {
				// files: ['./src/js/**/*.js', './src/js/**/*.jsx'],
				// tasks: ['webpack-watch']
			// }
		}
	});

	// grunt.registerTask('webpack', ['webpack-watch']);
	grunt.registerTask('default', ['sass:app']);
	// grunt.registerTask('start', 'webpack-dev-server:start');
};

