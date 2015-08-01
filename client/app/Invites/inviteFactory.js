angular.module('inviteFactory', ['firebase'])

.factory('invite', ['$firebaseObject', '$http' , function ($firebaseObject, $http) {

  var inviteFactory = {};

  // mandrill API key ** free version API key only for production **
  // in real use case, should store this securely
  var mandrillKey = 'ul35c_Y39BxIZUIUa_HIog';

  inviteFactory.sendEmailInvitation = function (sender, orgName, recipient, recipientEmail) {

    // in production: use localhost for testing
    // change link when deployed
    var link = 'http://'+window.host+':3000/#/'+orgName+'/signup';

    var orgId;
    var orgRef = new Firebase('https://bizgramer.firebaseio.com/'+orgName);
    var orgObj = $firebaseObject(orgRef);
    orgObj.$loaded()
      .then(function() {
        // query firebase db to get the orgId for the logged in user's org
        orgId = orgObj.orgKey;
        var params = {
          "key": mandrillKey,
          "message": {
                "from_email": orgName+"@Hiver.com",
                "to":[{"email":recipientEmail}],
                "subject": "Hey "+recipient+" go signup at Hive!",
                "html":
                  "<h1>"+sender+" invited you to sign up for "+orgName+" at Hive</h1><h2>Your OrgID is "+orgId+"</h2><h3><a href='"+link+"''>"+link+"</a></h3>",
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
      })
      .catch(function (error) {
        console.log('error', error);
      });

  }; //end .sendEmailInvitation

  return inviteFactory;

}]);
