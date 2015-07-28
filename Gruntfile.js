module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'server/**/*.js','client/app/**/*.js']
    },

    karma: {
      unit: {
        configFile: 'specs/karma-unit.config.js',
        autoWatch: false,
        singleRun: true
      },
      midway: {
        configFile: 'specs/karma-midway.config.js',
        autoWatch: false,
        singleRun: true
      },
      e2e: {
        configFile: 'specs/karma-e2e.config.js',
        autoWatch: false,
        singleRun: true
      }
    },

    watch: {
      stylesheets: {
        files: 'client/assets/**/*.less',
        tasks: ['less:production']
      }
    },

    less: {
      development: {
        options: {
          paths: ["client/assets/css"]
        },
        files: {
          "client/assets/css/styles.css": "client/assets/less/*.less"
        }
      },
      production: {
        options: {
          paths: ["client/assets/css"]
        },
        files: {
           "client/assets/css/styles.css": "client/assets/less/*.less"
        }
      }
    }
  });



  grunt.registerTask('test', [
  	'jshint',
  	'karma'
  	]);
  // grunt.registerTask('unit', [
  //   'karma:'])

  grunt.registerTask('default', 'test');

};
