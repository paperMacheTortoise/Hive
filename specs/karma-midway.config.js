var sharedConfig = require('./karma-shared.config.js');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //extra testing code
    // 'client/lib/angular-mocks/angular-mocks.js',
    //extra testing code
    './node_modules/ng-midway-tester/src/ngMidwayTester.js',

    //mocha stuff
    'client/app/app.js',

    //test files
    './specs/midway/appSpec.js'
    // './specs/midway/routesSpec.js',
    // './specs/midway/requestsSpec.js'
  ]);

  conf.proxies = {
    '/': 'http://localhost:3000/'
  };
  config.set(conf);
};
