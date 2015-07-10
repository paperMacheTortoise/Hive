module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js','client/**/*.js']
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};