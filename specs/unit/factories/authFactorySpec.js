describe('authFactory tests', function() {
  var Auth, $firebaseAuth, $firebaseArray, Users;

  beforeEach(module('authFactory'));
  beforeEach(module('userFactory'));

  beforeEach(inject(function(_Auth_, _$firebaseAuth_, $injector, _$firebaseArray_, _Users_){
    MockFirebase.override();
    Auth = _Auth_;
    $firebaseAuth = _$firebaseAuth_;
    $firebaseArray = _$firebaseArray_;
    Users = _Users_;
  }));

  describe('Signup user ', function() {

    it('should have a signup function', function(){
        expect(Auth.signup).to.be.a('function');
      });

    // it('should signup a user', function(){
    //     Auth.signup("kay@gmail.com", 'tiger', 'test', 'hr', null);
    //     expect(Auth.checkLogin()).to.be.a('object');
    //   });
  });

});


// //get the ref for the users array.?

// var orgName = "hr";
// //first test signup user

// var orgRef = new Firebase('https://bizgramer.firebaseio.com/'+orgName);
// var orgArr = $firebaseArray(orgRef);
// orgArr.$loaded()
//   .then(function() {
//     if(orgArr.$getRecord('orgKey')['$value'] === 'test') {
//       authObj.$createUser({
//         email: 'kay@gmail.com',
//         password: 'bees'
//   }).then(function() {

//   });

//    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/users');
//     var users = $firebaseArray(ref);
//     return {
//       ref:ref,
//       users:users
//     };

// users.flush();
// console.assert(users.getEmailUser('ben@example.com'), 'ben was created');
