var sharedConfig = require('./karma-shared.config.js');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //extra testing code
    './node_modules/ng-midway-tester/src/ngMidwayTester.js',

    //mocha stuff

    //test files
    './specs/midway/**/*.js'
  ]);

  // conf.proxies = {
  //   '/': 'http://localhost:9999/'
  // };
  config.set(conf);
};
