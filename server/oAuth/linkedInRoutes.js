var LinkedInOAuth = require('./linkedInController.js');
var serverConfig = require('../server-config.js');
var controller = require('../controller.js');
var passport = require('passport');
var TokenGenerator = require('firebase-token-generator');
var Firebase = require('firebase');
var ref = new Firebase('https://bizgramer.firebaseio.com/');

var tokGen = new TokenGenerator(serverConfig.FIREBASE_SECRET);
var id = Math.floor(Math.random() * 50000);

module.exports = function(app) {
  var action = '';

  app.get('/auth/linkedin',
  	passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

 app.get('/auth/linkedin/callback',
   passport.authenticate('linkedin', { failureRedirect: '/' }),
   function(req, res) {
    res.redirect('/linkedin');
    // res.send(token);
  });

 app.get('/linkedin', function(req, res){
    console.log(req.user);
    var token = tokGen.createToken({uid: 'linkedin:' + id, linkedin: req.user});
    ref.authWithCustomToken(token, function(err, authData){
      var data = authData;
      res.json(data);
    })
 });

};
