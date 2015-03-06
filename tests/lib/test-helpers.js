function verify(expected, actual) {
	actual = JSON.stringify(actual);
	expected = JSON.stringify(expected);

	ok(expected == actual, "Expected : " + expected + " - Recieved : " + actual);
	if (expected != actual) {
		console.log(actual);
	}
}

//**************************************************
//	Angular Helpers
//**************************************************

function GetInjector() {
	var $injector = angular.element(document.body).injector();
	if (!$injector) {
		$injector = angular.bootstrap(document, ['app']);
	}
	return $injector;
}

function GetController(controllerName) {
	var $injector = GetInjector();
	var $scope = $injector.get('$rootScope').$new();
	var $controller = $injector.get('$controller');
	$controller(controllerName, {
		$scope: $scope
	});
	return $scope;
};

function GetFactory(factoryName) {
	var $injector = GetInjector();
	var $factory = $injector.get(factoryName);
	return $factory;
}