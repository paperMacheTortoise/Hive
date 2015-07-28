var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var keys = require('../../config.js');

var LINKED_IN_KEY = keys.LINKED_IN_KEY;
var LINKED_IN_SECRET = keys.LINKED_IN_SECRET;

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

passport.use(new LinkedInStrategy({
	consumerKey: LINKED_IN_KEY,
	consumerSecret: LINKED_IN_SECRET,
	callbackURL: "http://localhost:3000/auth/linkedin/callback",
	scope: ['r_basicprofile', 'r_emailaddress'],
	profileFields: ['id', 'formatted-name','first-name', 'last-name', 'email-address','public-profile-url', 'picture-url', 'headline'],
	state: true
	},

	function(token, refreshToken, profile, done){
	    process.nextTick(function () {
	    	var user = { 
	    		uid: profile.provider + ':' + profile.id,
	    		linkedin: profile._json
	    	};

	     	return done(0, user);
    	});
    }
));


