module.exports = function(){
  return {
    basePath: '../',
    frameworks: ['mocha', 'chai'],
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    port: 9876,
    colors: true,
    autowatch: false,
    singleRun: true,

    files: [
      // angular bower source
      'client/lib/angular/angular.min.js',
      'client/lib/angularfire/dist/angularfire.min.js',
      'client/lib/ui-router/release/angular-ui-router.min.js',
      'client/lib/angular-bootstrap/ui-bootstrap.js',
      'client/lib/firebase/firebase.js',

      // app code
      'client/app/**/*.js',
      'client/app/*.js',

      // spec files
      // './specs/client/*.spec.js',
      //test-specific code
    ]

  };
};
