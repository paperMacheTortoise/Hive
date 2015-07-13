module.exports = function(grunt) {

 
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js','client/app/**/*.js']
    },

    karma: {
    	travis: {
    		options: {
    		basePath: '',
			frameworks: ['mocha', 'chai'],
			files: [
				// angular source
				'client/lib/angular/angular.min.js',
				'client/lib/angularfire/dist/angularfire.min.js',
				'client/lib/ui-router/release/angular-ui-router.min.js',

				// app code
				'client/app/**/*.js',
				'client/app/*.js',

				// spec files
				'specs/client/*.spec.js'
			],
			exclude: [
				'karma.conf.js'
			],
			reporters: ['progress'],
			port: 9876,
			colors: true,
			logLevel: 'INFO',
			autowatch: false,
			browsers: ['Chrome'],
			singleRun: true
			}	
    	}
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('test', [
  	'jshint',
  	'karma'
  	]);

  grunt.registerTask('default', 'test');
 
};