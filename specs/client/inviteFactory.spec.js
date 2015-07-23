describe('inviteFactory', function(){
  var invite, $firebaseObject;

  beforeEach(module('inviteFactory'));
  beforeEach(inject(function(_invite_, _$firebaseObject_, _$http_){
    invite = _invite_;
    $firebaseObject = _$firebaseObject_;
  }));

  describe('sendEmailInvitation', function () {
    it('should have a sendEmailInvitation function', function() {
      expect(invite.sendEmailInvitation).to.be.a('function');
    });
  });

});
