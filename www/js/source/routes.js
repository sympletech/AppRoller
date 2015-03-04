app.routes = [
	{ name: 'Home', icon:'home', path: '/home', template: 'partials/home.html', controller: 'HomeController', secure: false },
	{ name: 'Dashboard', icon: 'dashboard', path: '/dashboard', template: 'partials/content-page.html', controller: '', secure: false },
	{ name: 'Laboratory', icon: 'lab', path: '/laboratory', template: 'partials/content-page.html', controller: '', secure: false }
];

app.config(['$routeProvider', function ($routeProvider) {
	for (var i = 0; i < app.routes.length; i++) {
		var route = app.routes[i];

		$routeProvider.when(route.path, {
			templateUrl: route.template,
			controller: route.controller,
			path: route.path
		});
	}

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);