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
		'css/reset.css',
		'css/centurion-grid_v2.min.css',
		'//fast.fonts.com/cssapi/23855eec-5fdf-4594-9898-0113a04bfef0.css',
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

