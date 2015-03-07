var _global = {
	env: '',
	apiPath: '',
};

(function () {
	var apiPath = 'myapp/';

	//********************************************************
	//	Environment
	//********************************************************
	switch (location.hostname) {
		case 'localhost':
			_global.env = 'dev';
			_global.apiPath = "//localhost:50207/" + apiPath;
			break;
		case 'dev.myserver.com':
			_global.env = 'dev';
			_global.apiPath = "//api_dev.myserver.com/" + apiPath;
			break;
		case 'qa.myserver.com':
			_global.env = 'dev';
			_global.apiPath = "//api_qa.myserver.com/" + apiPath;
			break;
		default:
			_global.env = 'prd';
			_global.apiPath = "//api.myserver.com/" + apiPath;
			break;
	}

	//********************************************************
	//	Style Sheets
	//********************************************************
	var styles = [
		'css/lib/Semantic-UI-1.10.3/semantic.min.css',
		_global.env == 'prd' ? 'css/app-min.css' : 'css/app.css'
	];

	//********************************************************
	//	Scripts
	//********************************************************
	var scripts = [
		'js/lib/jquery-1.11.2.min.js',
		'js/lib/angular.min.js',
		'js/lib/angular-route.min.js',
		'js/lib/angular-sanitize.min.js',
		'js/lib/angular-ie7-support.min.js',
		'js/lib/lodash.2.4.1.min.js',
		'js/lib/jquery.cookie.js',
		'js/lib/modernizr.js',
		'css/lib/Semantic-UI-1.10.3/semantic.min.js',
		'css/lib/Semantic-UI-1.10.3/angular-semantic-ui.min.js',
		_global.env == 'prd' ? 'js/app-min.js' : 'js/app.js'
	];

	var includes = '';
	//********************************************************
	//	Write the includes
	//********************************************************
	//Construct the CSS link tags
	for (var st = 0; st < styles.length; st++) {
		includes += '<link href="' + styles[st] + '" rel="stylesheet" type="text/css">';
	}

	//Construct the script tags
	for (var sc = 0; sc < scripts.length; sc++) {
		var script = scripts[sc];
		if (location.href.indexOf('?coverage') > - 1 && script == 'js/app.js') {
			includes += '<script type="text/javascript" src="' + script + '" data-cover></script>';
		} else {
			includes += '<script type="text/javascript" src="' + script + '"></script>';
		}

		
	}

	document.write(includes);

	//********************************************************
	//	console.log
	//********************************************************
	if (typeof window.console === "undefined" || typeof window.console.log === "undefined" || _global.env == 'prd') {
		window.console = window.console ? window.console : {};
		window.console.log = function () { };
	}
})();

