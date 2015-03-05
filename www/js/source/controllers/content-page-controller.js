app.controller('ContentPageController', [
	'$scope', 'xssAjax',
	function ($scope, xssAjax) {

		$scope.things = [];
		$scope.apiStatus = '';

		$scope.loadThings = function () {
			xssAjax.get(_global.apiPath + '/Things')
				.then(function (result) {
					$scope.things = result.data;
					$scope.apiStatus = 'Online';
				},function () {
					$scope.apiStatus = 'Offline';
				});
		};

		$scope.loadThings();

	}]);