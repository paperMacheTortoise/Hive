var sharedConfig = require('./karma-shared.config.js');

module.exports = function(config){
	conf = sharedConfig();

	conf.files = conf.files.concat([
		//extra testing code
		'client/lib/angular-mocks/angular-mocks.js',
		//test files
    './specs/unit/factories/replyFactorySpec.js',
    './specs/unit/factories/usersFactory.spec.js',
    './specs/unit/factories/authFactorySpec.js',
    './specs/unit/factories/dmFactory.spec.js',
    './specs/unit/factories/oAuthFactory.spec.js',
    './specs/unit/factories/orgSignup.spec.js'
		// './unit/**/*.js'

	]);

	config.set(conf);
};
