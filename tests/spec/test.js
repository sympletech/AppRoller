QUnit.module("example-tests");

QUnit.test('getCatalogItems', function () {
	var expected = "World";

	var results = "Hello";

	verify(expected, results);
});