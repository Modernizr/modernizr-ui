module.exports = function(grunt) {

	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

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
		watch: {
			sass: {
				files: ['./src/css/*.scss'],
				tasks: ['sass:app']
			}
		},
	});

	grunt.registerTask('default', ['sass:app']);

};

