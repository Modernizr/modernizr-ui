module.exports = function(grunt) {

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
		browserify: {
			app: {
				options: {
					debug: true,
					transform: [require('grunt-react').browserify]
				},
				src: './src/js/main.js',
				dest: './build/app.js'
			}
		},
		watch: {
			sass: {
				files: ['./src/css/**/*.scss'],
				tasks: ['sass:app']
			},
			app: {
				files: ['./src/js/**/*.js'],
				tasks: ['browserify:app']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify:app', 'sass:app']);
};

