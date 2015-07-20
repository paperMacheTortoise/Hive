module.exports = function(grunt) {

 
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'server/**/*.js','client/app/**/*.js']
    },

    karma: {
    	unit: {
    		configFile: 'karma.conf.js',
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 

  grunt.registerTask('test', [
  	'jshint',
  	'karma'
  	]);

  grunt.registerTask('default', 'test');
 
};