app.controller('HeaderController', [
	'$rootScope', '$scope', 'authorizationService',
	function ($rootScope, $scope, authorizationService) {

		$scope.userLoggedIn = authorizationService.userLoggedIn;
		$scope.currentUser = authorizationService.currentUser;

		$scope.loginModalVisible = false;

		$scope.showLoginModal = function () {
			$scope.loginModalVisible = true;
		};

		$scope.hideLoginModal = function () {
			$scope.loginModalVisible = false;
		};

		$scope.username = 'dlewis';
		$scope.password = 'password';
		$scope.errorMessage = null;

		$scope.attemptLogin = function () {
			authorizationService
				.logInUser($scope.username, $scope.password)
				.then(function (result) {
				if (result.success) {
					$scope.loginModalVisible = false;
				} else {
					$scope.errorMessage = result.message;
				}
			});
		};

		$scope.logOut = function() {
			authorizationService.logOut();
		};

		$rootScope.$on('auth-state-changed', function (e, authStateInfo) {
			$scope.currentUser = authStateInfo.currentUser;
			$scope.userLoggedIn = authStateInfo.userLoggedIn;
		});
	}]);