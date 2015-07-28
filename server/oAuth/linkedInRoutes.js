require('./linkedInController.js');
// var serverConfig = require('../server-config.js');
// var controller = require('../controller.js');
var passport = require('passport');
// var TokenGenerator = require('firebase-token-generator');
var Firebase = require('firebase');

// var tokGen = new TokenGenerator(serverConfig.FIREBASE_SECRET);
// var id = Math.floor(Math.random() * 50000);
var org = '';
var user = '';
module.exports = function(app) {
  // var action = '';

  app.get('/auth/linkedin',
  	passport.authenticate('linkedin'));

 app.get('/auth/linkedin/callback',
   passport.authenticate('linkedin', { failureRedirect: '/' }),
   function(req, res) {
    var data = req.user;
    var userRef = new Firebase('https://bizgramer.firebaseio.com/' + org + '/users');
    userRef.child(user).update({
      username: data.linkedin.formattedName,
      pictureUrl: data.linkedin.pictureUrl,
      linkedin: data.linkedin
    });
    res.redirect('/#/' + org + '/linkedinsuccess');
    // res.send(token);
  });

 // app.get('/linkedin', function(req, res){
  // console.log('server /linkedin', req.user);
    // var token = tokGen.createToken({uid: req.user.uid, linkedin: req.user.thirdPartyUserData});
    // ref.authWithCustomToken(token, function(err, authData){
 //    res.json(req.user);
 // });

 // app.post('/setAction', function(req, res){
 //  action = req.body.action;
 //  res.send('Org and Action set!');
 // });

 app.post('/setFBInfo', function(req, res){
  console.log(req.body);
  org = req.body.org;
  user = req.body.user;
  res.send('Firebase Info set!');
 });

  app.post('/setOrg', function(req, res){
  org = req.body.org;
  res.send('Org set!');
 });

};

 
