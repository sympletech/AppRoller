var _global = {
	env: '',
	webDir: '',
	apiUrl: '',
};

(function () {
	var cdnPath = 'apps/myapp/',
		apiPath = 'myapp/';

	//********************************************************
	//	Environment
	//********************************************************
	switch (location.hostname) {
		case 'localhost':
			_global.env = 'dev';
			_global.webDir = "//" + location.hostname + ":" + location.port + "/";
			_global.apiPath = "//localhost:50207/" + apiPath;
			break;
		case 'cmsdev.esri.com': case 'webapps-cdn-dev.esri.com':
			_global.env = 'dev';
			_global.webDir = "//webapps-cdn-dev.esri.com/" + cdnPath;
			_global.apiPath = "//webopsapi_dev.esri.com/" + apiPath;
			break;
		case 'cmsqa.esri.com': case 'webapps-cdn-stg.esri.com':
			_global.env = 'dev';
			_global.webDir = "//webapps-cdn-stg.esri.com/" + cdnPath;
			_global.apiPath = "//webopsapi_stg.esri.com/" + apiPath;
			break;
		default:
			_global.env = 'prd';
			_global.webDir = "//webapps-cdn.esri.com/" + cdnPath;
			_global.apiPath = "//webopsapi.esri.com/" + apiPath;
			break;
	}

	//********************************************************
	//	Style Sheets
	//********************************************************
	var styles = [
		'css/Semantic-UI-1.10.3/semantic.min.css',
		'css/app.css'
	];

	//********************************************************
	//	Scripts
	//********************************************************
	var scripts = [
		'js/lib/jquery-1.11.2.min.js',
		'js/lib/angular.min.js',
		'js/lib/angular-route.min.js',
		'js/lib/angular-ie7-support.min.js',
		'js/lib/lodash.2.4.1.min.js',
		'js/lib/jquery.cookie.js',
		'css/Semantic-UI-1.10.3/semantic.min.js',
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
		includes += '<script type="text/javascript" src="' + script + '"></script>';
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

