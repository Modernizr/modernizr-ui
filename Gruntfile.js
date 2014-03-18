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
		watch: {
			sass: {
				files: ['./src/css/*.scss'],
				tasks: ['sass:app']
			}
		}
	});

	grunt.registerTask('default', ['sass:app']);
};

