app.controller('NavigationController', [
	'$rootScope', '$scope', '$location',
	function ($rootScope, $scope, $location) {

		$scope.navItems = app.routes;

		$scope.loadPage = function(navItem) {
			$location.path(navItem.path);
		};

		function setActiveNavItem() {
			_.each($scope.navItems, function(navItem) {
				navItem.active = navItem.path == $location.path();
			});
		}

		$scope.$on('$routeChangeStart', function(next, current) { 
			setActiveNavItem();
		});
		setActiveNavItem();
		

	}]);