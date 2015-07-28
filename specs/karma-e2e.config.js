var sharedConfig = require('./karma-shared.config.js');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //test files
    './e2e/**/*.js'
  ]);

  // conf.proxies = {
  //   '/': 'http://localhost:9999/'
  // };

  // conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  config.set(conf);
};
