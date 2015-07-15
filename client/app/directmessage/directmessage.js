angular.module('directMessageCtrl', [])

.controller('directMessageController', function (Users, $rootScope){

	var vm = this;
	vm.recipient = Users.getUsername();

});