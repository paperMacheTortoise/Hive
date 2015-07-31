angular.module('orgsignupFactory', ['firebase'])

.factory('OrgSignup', ['$firebaseArray', '$firebaseObject', '$http', 'Auth',function ($firebaseArray, $firebaseObject, $http, Auth) {

  var orgsignupFactory = {};
  var mandrillKey = 'ul35c_Y39BxIZUIUa_HIog';
  var ref = new Firebase('https://bizgramer.firebaseio.com/');
  var organizations = $firebaseArray(ref);
  var orgNames = [];

  // Firebase function to generate index, use this for generating random orgId
  var generatePushID = (function() {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;

    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;

      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) {
        throw new Error('We should have converted the entire timestamp.');
      }

      var id = timeStampChars.join('');

      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length !== 20) {
        throw new Error('Length should be 20.');
      }

      return id;
    };
  })(); //end generate ID function

  // Async function to get all the org names
  organizations.$loaded()
    .then(function () {
      angular.forEach(organizations, function (org) {
        orgNames.push(org.$id);
      });
    });

    orgsignupFactory.getOrgs = function () {
      return orgNames;
    };

    orgsignupFactory.signupOrg = function (orgname, creator, email, password, cb) {
      // Create new branch for this organization on firebase db
      ref.child(orgname).set('new organization');
      var orgId = generatePushID();
      // Simplify the orgId to only 5 letters for demo simplicity
      orgId = orgId.substr(-5);
      ref.child(orgname + '/orgKey').set(orgId);

      // Create a default 'General' chat room for each org created
      ref.child(orgname + '/rooms/General').set('this room is empty');

      // Send out email to creator of the org with orgId
      var link = 'http://'+window.host+':3000/#/'+orgname+'/signup';
      var orgRef = new Firebase('https://bizgramer.firebaseio.com/'+orgname);
      var orgObj = $firebaseObject(orgRef);
      orgObj.$loaded()
        .then(function() {
          var params = {
            "key": mandrillKey,
            "message": {
                  "from_email": "welcome@BizGram.com",
                  "to":[{"email":email}],
                  "subject": "Hey "+creator+" here's your secret org key!",
                  "html":
                    "<h1> Hi "+creator+" </h1><h2>Thanks for signing up "+orgname+" at BizGram</h2><h2>Your Organization name is "+orgname+"</h2><h2>Your OrgID is "+orgId+"</h2><a href='"+link+"'>Sign up user account here</a>",
                  "autotext": true,
                  "track_opens": true,
                  "track_clicks": true
            }
          }; // end params

          // send ajax request to Mandrill api for email invite
          $http.post('https://mandrillapp.com/api/1.0/messages/send.json', params)
            .success(function() {
              console.log('email invite sent successfully');
            })
            .error(function() {
              console.log('error sending email invite');
            });
           Auth.signup(email, password, orgId, orgname, function(error, data){
            Auth.setupUser(creator, orgname, email, data.uid, data.password.profileImageURL, function(){
              cb();
            });
           },this);

          var fireArr = $firebaseArray(new Firebase('https://bizgramer.firebaseio.com/'+orgname+'/rooms/General'));
          // initial default chat message for General chat room
          fireArr.$add({username:'Hive Helper', text:'Start typing below to begin chatting',img:'assets/hive.jpg', createdAt: Firebase.ServerValue.TIMESTAMP}).then(function(){
            console.log('set up general');
          });
        })
        .catch(function (error) {
          console.log('error', error);
        });
    };

    return orgsignupFactory;
}]);
