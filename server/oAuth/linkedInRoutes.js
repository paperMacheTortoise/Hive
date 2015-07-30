require('./linkedInController.js');

var passport = require('passport');
var Firebase = require('firebase');

global.user = '';
global.org = '';
module.exports = function(app) {

 app.get('/auth/linkedin',
  	passport.authenticate('linkedin'));

 app.get('/auth/linkedin/callback',
   passport.authenticate('linkedin', { failureRedirect: '/' }),
   function(req, res) {
    var data = req.user;
    var userRef = new Firebase('https://bizgramer.firebaseio.com/' + org + '/users');
    userRef.child(user).update({
      username: data.linkedin.firstName + data.linkedin.lastName,
      pictureUrl: data.linkedin.pictureUrl,
      linkedin: data.linkedin
    });
    res.redirect('/#/' + org + '/linkedinsuccess');
  });

 app.post('/setFBInfo', function(req, res){
  global.org = req.body.org;
  req.session.org = req.body.org;
  global.user = req.body.user;
  res.send('Firebase Info set!');
 });

 app.post('/setOrg', function(req, res){
  global.org = req.body.org;
  req.session.org = req.body.org;
  res.send('Org set!');
 });

};

 
