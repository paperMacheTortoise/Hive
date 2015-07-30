var passport = require('passport');
var IntuitStrategy = require('passport-intuit-oauth').Strategy;
var QuickBooks = require('node-quickbooks');
var Firebase = require("firebase");

var INTUIT_CONSUMER_KEY = 'qyprdns8EP57q1ffSi1EqWyK4q47qm';
var INTUIT_CONSUMER_SECRET = 'izBgcIONbmMOsePPh18AA8glJ04Or0HMkMDK2a4a';
// Passport session setup.

//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Intuit profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Use the IntuitStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Intuit profile), and
//   invoke a callback with a user object.
passport.use(new IntuitStrategy({
    consumerKey: INTUIT_CONSUMER_KEY,
    consumerSecret: INTUIT_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/intuit/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    var myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+global.org+"/qbo");

    process.nextTick(function () {
      var qbo = new QuickBooks(INTUIT_CONSUMER_KEY,
                           INTUIT_CONSUMER_SECRET,
                           token,
                           tokenSecret,
                           profile.realmId,
                           true, // use the Sandbox
                           true);
     
      profile.qbo = qbo;

      myFirebaseRef.update(
          {
            qbokey: qbo,
            token: token,
            tokenSecret: tokenSecret,
            profile: profile
          }
        );

      // To keep the example simple, the user's Intuit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Intuit account with a user record in your database,
      // and return that user instead.

      return done(null, profile);
    });
  }
));

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { console.log("Passport middleware, isAuthenticated");  return next(); }
    res.redirect('/login');
  }
};
