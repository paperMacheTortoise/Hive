describe('inviteFactory', function(){
  var invite, $firebaseObject;

  beforeEach(module('inviteFactory'));
  beforeEach(inject(function(_invite_, _$firebaseObject_, _$http_){
    invite = _invite_;
    $firebaseObject = _$firebaseObject_;
  }));

});
