module.exports = function(config){
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai'],
		files: [
			// angular source
			'client/lib/angular/angular.min.js',
			'client/lib/angularfire/dist/angularfire.min.js',
			'client/lib/ui-router/release/angular-ui-router.min.js',
			'client/lib/angular-mocks/angular-mocks.js',
			'client/lib/angular-bootstrap/ui-bootstrap.js',
			'client/lib/firebase/firebase.js',

			// app code
			'client/app/**/*.js',
			'client/app/*.js',

			// spec files
			'specs/client/*.spec.js'
		],
		exclude: [
			'karma.conf.js'
		],
		reporter: ['progress'],
		port: 9876,
		colors: true,
		logLevel: 'INFO',
		autowatch: false,
		browsers: ['PhantomJS'],
		singleRun: true
	});
};