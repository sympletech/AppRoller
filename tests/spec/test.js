QUnit.module("example-tests");

QUnit.test('Home Controller Test', function () {
	var expected = "Welcome";

	var $scope = GetController('HomeController');

	var results = $scope.message;

	verify(expected, results);
});

QUnit.test('Authorization Service Factory Test', function () {
	var expected = 'object';

	var $factory = GetFactory('authorizationService');

	var results = typeof $factory.currentUser;

	verify(expected, results);
});