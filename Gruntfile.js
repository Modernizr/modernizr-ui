module.exports = function(grunt) {

  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    "webpack-dev-server": {
      options: {
        webpack: webpackConfig,
        publicPath: "",
        contentBase: './dev'
      },
      start: {
        watch: true,
        keepAlive: true,
        webpack: {
          devtool: "sourcemap",
          debug: true
        }
      }
    },
    watch: {
      sass: {
        files: ['src/css/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceComments: 'map'
        },
        files: { 'dev/main.css': 'src/css/main.scss' }
      }
    },
    exec: {
      docpad: {
        cmd: "docpad generate -e production"
      },
      docpad_run: {
        cmd: "docpad run"
      },
      clear_dist: {
        cmd: "rm -rf ./dist/"
      }
    },
    execute: {
      // TODO :: currently this dumps metadata.json into the module's dist
      //      we need to pass options into generate-meta.js to define
      //       our own outputDir
      modernizr: {
        src: ['./node_modules/modernizr/lib/generate-meta.js'],
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    concurrent: {
      serve: {
        tasks: ['webpack-dev-server:start', 'watch:sass', 'exec:docpad_run'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask("default", ["concurrent:serve"]);
  grunt.registerTask("dist", ["exec:clear_dist", "exec:docpad"])

};
