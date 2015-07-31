describe('replyFactory', function(){
  var Replies, $firebaseArray;

  beforeEach(module('replyFactory'));
  beforeEach(inject(function(_Replies_, _$firebaseArray_){
    Replies = _Replies_;
    $firebaseArray = _$firebaseArray_;
  }));

  describe('REplies Factory Methods', function(){
    describe('getReplies', function(){
      it('should have a getReplies function', function(){
        expect(Replies.getReplies).to.be.a('function');
      });
    });
  });
});
