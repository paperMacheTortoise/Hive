module.exports = function(grunt) {

 
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js','client/app/**/*.js']
    },

    karma: {
    	travis: {
    		configFile: 'karma.conf.js'
    	},
    	unit: {
    		configFile: 'karma.conf.js',
    		browsers: ['Chrome']
    	}
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('test', [
  	'jshint',
  	'karma:travis'
  	]);
 
  grunt.registerTask('devmode', [
  	'jshint',
  	'karma:unit'
  	]);

  grunt.registerTask('default');
 
};