angular.module('linkedinCtrl', [])

.controller('linkedInController', function (LinkedinAuth, Users, $state, $stateParams, $rootScope){
	var vm = this;
	vm.org = $stateParams.org;

	vm.redirectToProfile = function(){
		$state.go('profile', {org: vm.org});
	};

	vm.updateProfile = function(){
		LinkedinAuth.updateProfile()
			.then(function(){
				console.log('profile updated with linkedin');
			});

	};
});